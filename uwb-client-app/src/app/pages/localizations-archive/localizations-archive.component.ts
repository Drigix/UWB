import { Component, OnInit } from '@angular/core';
import { IBackground } from '@entities/background/background.model';
import { ILocalizationArchive } from '@entities/localization/localization-archive.model';
import { IObject } from '@entities/objects/object.model';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { LocalizationsArchiveService } from '@services/localizations/localizations-archive.service';
import { LocalizationsService } from '@services/localizations/localizations.service';
import { ObjectsService } from '@services/objects/objects.service';

@Component({
  selector: 'app-localizations-archive',
  templateUrl: './localizations-archive.component.html',
  styleUrls: ['./localizations-archive.component.scss']
})
export class LocalizationsArchiveComponent implements OnInit {

  backgrounds: IBackground[] = [];
  objects: IObject[] = [];
  selectedBackground?: IBackground;
  selectedObject?: IObject;
  selectedRangeDate: Date[] = [];
  localizations: ILocalizationArchive[] = [];

  constructor(private backgroundsService: BackgroundsService, private localizationsArchiveService: LocalizationsArchiveService, private objectsService: ObjectsService) { }

  ngOnInit() {
    this.loadBackgrounds();
    this.loadObjects();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAll().subscribe((res) => {
      this.backgrounds = res;
    });
  }

  loadObjects(): void {
    this.objectsService.findAll().subscribe((res) => {
      this.objects = res;
    });
  }

  loadLocalizationsData(): void {
    this.localizationsArchiveService.findAllArchiveData().subscribe(
      (res) => {
        const localizations = res;
        this.localizations = localizations.filter((loc: any) => loc.objectId && loc.objectId === this.selectedObject?.hexTagId);
          this.localizations.forEach(item => {
          const serachObject = this.objects.find(o => o.hexTagId === item.objectId);
          item.name = serachObject!.name! + ' ' + serachObject!.lastName;
          item.xPx = item.x! * this.selectedBackground?.scale!;
          item.yPx = item.y! * this.selectedBackground?.scale!;
        });
      }
    );
  }

  onBackgroundSelect(background?: IBackground): void {
    this.selectedBackground = background;
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
    this.loadLocalizationsData();
  }
}
