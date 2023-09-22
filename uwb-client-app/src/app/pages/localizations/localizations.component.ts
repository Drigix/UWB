import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAnchor } from '@entities/anchor/anchor.model';
import { IArea } from '@entities/area/area.model';
import { IBackground } from '@entities/background/background.model';
import { IObject } from '@entities/objects/object.model';
import { AnchorsService } from '@services/anchors/anchors.service';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { LocalizationsService } from '@services/localizations/localizations.service';
import { ObjectsService } from '@services/objects/objects.service';

@Component({
  selector: 'uwb-localizations',
  templateUrl: './localizations.component.html',
  styleUrls: ['./localizations.component.scss']
})
export class LocalizationsComponent implements OnInit {

  backgrounds: IBackground[] = [];
  objects: IObject[] = [];
  anchors: IAnchor[] = [];
  localizationObjects: IObject[] = [];
  areas: IArea[] = [];
  localizations: any[] = [];
  selectedBackground?: IBackground;
  selectedObject?: IObject;
  selectedAnchor?: IAnchor;
  selectedArea?: IArea;
  localizationInterval?: NodeJS.Timer;

  /*OVERLAY OPTIONS*/
  showAnchors = false;
  showAreas = false;

  constructor(
    private backgroundsService: BackgroundsService,
    private objectsService: ObjectsService,
    private localizationsService: LocalizationsService,
    private anchorsService: AnchorsService
  ) { }

  ngOnInit() {
    this.loadBackgrounds();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAll().subscribe((res) => {
      this.backgrounds = res;
    });
  }

  loadAnchors(): void {
    this.anchorsService.findAll().subscribe(
      (res) => {
        const anchors: IAnchor[] = res;
        this.anchors = anchors.filter(a => a.background?.id === this.selectedBackground?.id);
      }
    );
  }

  loadObjects(): void {
    this.objectsService.findAll().subscribe((res: HttpResponse<IObject[]>) => {
      this.objects = res.body ?? [];
    });
  }

  loadAreas(): void {

  }

  loadLocalizations(): void {
    this.localizationsService.findAll().subscribe(
      (res) => {
        this.localizations = res;
        const tempLocalizations = res;
        this.localizations.forEach(loc => {
          loc.xPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * (loc.x! + 0.1) : loc.x;
          loc.yPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * (loc.y! + 0.1) : loc.y;
        });
        let x = 0;
        if(this.localizationInterval) {
          clearInterval(this.localizationInterval);
        }
        this.localizationInterval = setInterval(() => {
          this.localizations = [];
          this.localizationObjects = [];
          tempLocalizations.forEach((loc: any) => {
            if(x > 10) {
              loc.x -= 0.5;
            } else {
              loc.x += 0.5;
            }
            if(x > 10) {
              loc.y -= 0.5;
            } else {
              loc.y += 0.51;
            }
            loc.xPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * loc.x! : loc.x;
            loc.yPx = this.selectedBackground?.scale ? this.selectedBackground?.scale * loc.y! : loc.y;
            this.localizationObjects.push(this.objects.find(o => o.id === loc.objectId)!);
            x++;
          });
          this.localizations = tempLocalizations;
        }, 1000);
      }
    );
  }

  onBackgroundSelect(background?: IBackground): void {
    this.selectedBackground = background;
    this.loadLocalizations();
    this.loadObjects();
  }

  onObjectChange(object?: IObject): void {
    this.selectedObject = object;
  }

  onAreaChange(area?: IArea): void {
    this.selectedArea = area;
  }

  onAnchorChange(anchor?: IAnchor): void {
    this.selectedAnchor = anchor;
  }

  onShowAnchorsChange(showAnchors: boolean): void {
    if(showAnchors) {
      this.loadAnchors();
    } else {
      this.anchors = [];
    }
  }

  onShowAreasChange(showAreas: boolean): void {
    if(showAreas) {
      this.loadAreas();
    } else {
      this.anchors = [];
    }
  }
}
