import { Component, OnInit } from '@angular/core';
import { LocalizationsService } from '@services/localizations/localizations.service';

@Component({
  selector: 'app-localizations-archive',
  templateUrl: './localizations-archive.component.html',
  styleUrls: ['./localizations-archive.component.scss']
})
export class LocalizationsArchiveComponent implements OnInit {

  localizations: any[] = [];
  radius = 10;
  blur = 15;

  constructor(private localizationsService: LocalizationsService) { }

  ngOnInit() {
    this.loadLocalizationsData();
  }

  loadLocalizationsData(): void {
    this.localizationsService.findAll().subscribe(
      (res) => {
        this.localizations = res;
      }
    )
  }
}
