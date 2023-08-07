import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '@shared/theme/theme.service';
import { Themes } from '../themes';

@Component({
  selector: 'uwb-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  firstLoad = false;

  constructor(
    private translateService: TranslateService,
    private themeService: ThemeService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.firstLoad = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.setLastUsedTheme(); }, 100);
  }

  isAuthenticated(): boolean {
    return true;
  }

  private setLastUsedTheme(): void {
    const html = document.getElementsByTagName('html')[0];
    const lastUsedTheme = this.themeService.getLastSavedTheme();
    Themes.themes.get(lastUsedTheme)!.forEach((value, key) => {
      html.style.setProperty(key, value);
    });
  }
}
