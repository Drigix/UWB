import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '@auth/authority.service';
import { IBackground } from '@entities/background/background.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { ILocalizationArchive } from '@entities/localization/localization-archive.model';
import { ILocalization } from '@entities/localization/localization.model';
import { IObject } from '@entities/objects/object.model';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ClientsService } from '@services/clients/clients.service';
import { LocalizationsArchiveService } from '@services/localizations/localizations-archive.service';
import { LocalizationsService } from '@services/localizations/localizations.service';
import { ObjectsService } from '@services/objects/objects.service';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';
import { DateService } from '@shared/date/date.service';
import { SizeScreenService } from '@shared/screen/size-screen.service';

@Component({
  selector: 'app-localizations-archive',
  templateUrl: './localizations-archive.component.html',
  styleUrls: ['./localizations-archive.component.scss']
})
export class LocalizationsArchiveComponent implements OnInit {

  treeSelectItems: IClientUnit[] = [];
  backgrounds: IBackground[] = [];
  localizations: ILocalization [] = [];
  objects: IObject[] = [];
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  selectedBackground?: IBackground;
  selectedObject?: IObject;
  selectedRangeDate: Date[] = [];
  handleSelectedRangeDate?: Date[] = [];
  handleSelectedObject?: IObject;
  userOrganizationUnitId?: number;
  smallScreen = false;

  constructor(
    private backgroundsService: BackgroundsService,
    private localizationsArchiveService: LocalizationsArchiveService,
    private objectsService: ObjectsService,
    private dateService: DateService,
    private authorityService: AuthorityService,
    private arrayBufferService: ArrayBufferService,
    private clientsService: ClientsService,
    private sizeScreenService: SizeScreenService
    ) { }

  ngOnInit() {
    this.sizeScreenService.smallScreen$.subscribe((smallScreen) => {
      this.smallScreen = smallScreen;
    });
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loadOrganizationUnits();
    this.loadBackgrounds();
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        this.selectedOrganizationUnit = this.treeSelectItemSelected.data;
      }
    );
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAllByUserOrganizationUnit(this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IBackground[]>) => {
        this.backgrounds = res.body ?? [];
        this.backgrounds.forEach(b => b.fullPath = this.arrayBufferService.convertImage(b.pathArrayBuffer!));
      });
  }

  loadObjects(): void {
    this.objectsService.findAllByUserOrganizationUnit(this.userOrganizationUnitId!).subscribe(
    (res: HttpResponse<IObject[]>) => {
      this.objects = res.body ?? [];
    });
  }

  loadLocalizationsData(): void {
    const dateFrom = this.selectedRangeDate[0];
    const dateTo = this.selectedRangeDate[1];
    this.localizationsArchiveService.findAllByTagIdAndDateBetween(this.selectedObject?.hexTagId!, dateFrom, dateTo).subscribe(
      (res: HttpResponse<ILocalization[]>) => {
        this.localizations = res.body ?? [];
          this.localizations.forEach(item => {
          item.name = this.selectedObject?.name! + ' ' + this.selectedObject?.secondName;
          item.xPx = this.selectedBackground?.scale ? item.x! * this.selectedBackground?.scale! : item.x;
          item.yPx = this.selectedBackground?.scale ? item.y! * this.selectedBackground?.scale!: item.y;
          item.fullPath = this.arrayBufferService.convertImage(item.pathArrayBuffer!);
        });
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedBackground = undefined;
      this.loadBackgrounds();
    }
  }

  onBackgroundSelect(background?: IBackground): void {
    this.selectedBackground = background;
    if(this.selectedBackground) {
      this.loadObjects();
    } else {
      this.objects = [];
    }
  }

  onObjectSelect(object?: IObject): void {
    this.selectedObject = object;
  }

  onDateChange(rangeDate: Date[]): void {
    this.selectedRangeDate = rangeDate;
  }

  checkIsAllValid(): boolean {
    return this.selectedBackground! && this.selectedObject! && this.selectedRangeDate.length === 2;
  }

  onLoadLocalizationsArchive(): void {
    if(this.handleSelectedObject?.id !== this.selectedObject?.id ||
       this.selectedRangeDate[0] !== this.handleSelectedRangeDate![0] ||
       this.selectedRangeDate[1] !== this.handleSelectedRangeDate![1]) {
      this.loadLocalizationsData();
      this.handleSelectedObject = this.selectedObject;
      this.handleSelectedRangeDate = {...this.selectedRangeDate};
    }
  }
}
