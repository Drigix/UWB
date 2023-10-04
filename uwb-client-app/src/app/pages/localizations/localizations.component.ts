import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorityService } from '@auth/authority.service';
import { IAnchor } from '@entities/anchor/anchor.model';
import { IAreaVertex } from '@entities/area/area-vertex.model';
import { IArea } from '@entities/area/area.model';
import { IBackground } from '@entities/background/background.model';
import { ILocalization } from '@entities/localization/localization.model';
import { IObject } from '@entities/objects/object.model';
import { AnchorsService } from '@services/anchors/anchors.service';
import { AreaVertexesService } from '@services/areas/area-vertexes.service';
import { AreasService } from '@services/areas/areas.service';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { LocalizationsService } from '@services/localizations/localizations.service';
import { ObjectsService } from '@services/objects/objects.service';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'uwb-localizations',
  templateUrl: './localizations.component.html',
  styleUrls: ['./localizations.component.scss']
})
export class LocalizationsComponent implements OnInit, OnDestroy {

  backgrounds: IBackground[] = [];
  localizations: ILocalization[] = [];
  objects: IObject[] = [];
  localizationObjects: IObject[] = [];
  anchors: IAnchor[] = [];
  areas: IArea[] = [];
  areaVertexes: IAreaVertex[] = [];
  selectedBackground?: IBackground;
  selectedObjects: IObject[] = [];
  selectedAnchors: IAnchor[] = [];
  selectedAreas: IArea[] = [];
  selectedAreasVertexes: IAreaVertex[] = [];
  userOrganizationUnitId?: number;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private backgroundsService: BackgroundsService,
    private objectsService: ObjectsService,
    private localizationsService: LocalizationsService,
    private anchorsService: AnchorsService,
    private arrayBufferService: ArrayBufferService,
    private authorityService: AuthorityService,
    private areasService: AreasService,
    private areaVertexesService: AreaVertexesService
  ) { }

  ngOnInit() {
    this.localizationsService.connect();
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loadBackgrounds();
  }

  ngOnDestroy(): void {
      if(!this.destroy$.closed) {
        this.destroy$.next(false);
        this.destroy$.unsubscribe();
      }
      this.localizationsService.unsubscribe();
      this.localizationsService.disconnect();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAllByUserOrganizationUnit(this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IBackground[]>) => {
      this.backgrounds = res.body ?? [];
      this.backgrounds.forEach(b => b.fullPath = this.arrayBufferService.convertImage(b.pathArrayBuffer!));
    });
  }

  loadObjects(): void {
    this.objectsService.findAll().subscribe((res: HttpResponse<IObject[]>) => {
      this.objects = res.body ?? [];
      this.selectedObjects = this.objects;
    });
  }

  loadAnchors(): void {
    this.anchorsService.findAllByBackground(this.selectedBackground?.id!).subscribe(
      (res: HttpResponse<IAnchor[]>) => {
        this.anchors = res.body ?? [];
        console.log(this.anchors);
      }
    );
  }

  loadAreas(): void {
    this.areasService.findAllByBackground(this.selectedBackground?.id!).subscribe(
      (res: HttpResponse<IArea[]>) => {
        this.areas = res.body ?? [];
      }
    );
  }

  loadAreaVertexes(): void {
    this.areaVertexesService.findAllByBackground(this.selectedBackground?.id!).subscribe(
      (res: HttpResponse<IAreaVertex[]>) => {
        this.areaVertexes = res.body ?? [];
      }
    );
  }

  loadLocalizations(): void {
    this.localizationsService.subscribe(this.selectedBackground?.id!);
    this.localizationsService.receive().pipe(takeUntil(this.destroy$)).subscribe((localizationData) => {
      const tempLocalizations: ILocalization[] = localizationData;
      this.localizations = [];
      this.selectedObjects.forEach( i => {
        const serachLocalization = tempLocalizations.find( tl => tl.tagId === i.hexTagId);
        if(serachLocalization) {
          this.localizations.push(serachLocalization);
        }
      });
      this.localizations.forEach((loc) => {
        const searchObject = this.selectedObjects.find(o => o.hexTagId === loc.tagId);
        loc.name = searchObject?.name! + ' ' + searchObject?.secondName;
        loc.xPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * loc.x! : loc.x;
        loc.yPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * loc.y! : loc.y;
        loc.fullPath = this.arrayBufferService.convertImage(loc.pathArrayBuffer!);
      });
    });
  }

  onBackgroundSelect(background?: IBackground): void {
    this.resetMapOptions();
    this.selectedBackground = background;
    if(this.selectedBackground) {
      this.loadLocalizations();
      this.loadObjects();
      this.loadAnchors();
      this.loadAreas();
      this.loadAreaVertexes();
    } else {
      this.localizationsService.unsubscribe();
    }
  }

  onObjectChange(objects: IObject[]): void {
    this.selectedObjects = objects;
  }

  onAnchorChange(anchors: IAnchor[]): void {
    this.selectedAnchors = anchors;
  }

  onAreaChange(areas: IArea[]): void {
    this.selectedAreas = areas;
    this.selectedAreas.forEach(area => {
      const filterVertexes = this.areaVertexes.filter(v => v.areaId === area.id);
      this.selectedAreasVertexes = this.selectedAreasVertexes.concat(filterVertexes);
      console.log(this.selectedAreasVertexes);
    });
  }

  resetMapOptions(): void {
    this.anchors = [];
    this.areas = [];
    this.selectedObjects = [];
    this.selectedAnchors = [];
    this.selectedAreas = [];
  }
}
