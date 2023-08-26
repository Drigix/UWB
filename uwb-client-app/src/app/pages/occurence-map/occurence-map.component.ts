import { Component, OnInit } from '@angular/core';
import { IBackground } from '@entities/background/background.model';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { LocalizationsArchiveService } from '@services/localizations/localizations-archive.service';
import { LocalizationsService } from '@services/localizations/localizations.service';

@Component({
  selector: 'uwb-occurence-map',
  templateUrl: './occurence-map.component.html',
  styleUrls: ['./occurence-map.component.scss']
})
export class OccurenceMapComponent implements OnInit {

  backgrounds: IBackground[] = [];
  selectedBackground?: IBackground;
  localizations: any[] = [];
  radius = 10;
  blur = 15;

  constructor(private backgroundsService: BackgroundsService, private localizationsArchiveService: LocalizationsArchiveService) { }

  ngOnInit() {
    this.loadBackgrounds();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAll().subscribe((res) => {
      this.backgrounds = res;
    });
  }

  loadLocalizationsData(): void {
    this.localizationsArchiveService.findAll().subscribe(
      (res) => {
        this.localizations = res;
      }
    );
  }

  onBackgroundSelect(background?: IBackground): void {
    this.selectedBackground = background;
    this.loadLocalizationsData();
  }

  onDateChange(event: any): void {
    console.log(event);
  }
}
