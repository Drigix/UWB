import { Injectable } from '@angular/core';
import { ITheme } from '@entities/global/theme.model';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme$: Observable<string>;
  private themeSub: BehaviorSubject<string>;

  constructor(private translateService: TranslateService) {
    const USER_THEME = window.localStorage.getItem('user_theme');
    this.themeSub = new BehaviorSubject<string>(USER_THEME!);
    this.theme$ = this.themeSub.asObservable();
  }

  getThemes(): ITheme[] {
    const themes = [
      this.createThemeItem(1, this.translateService.instant('profile.theme.light'), 'primaryTheme', 'pi pi-sun'),
      this.createThemeItem(2, this.translateService.instant('profile.theme.dark'), 'darkTheme', 'pi pi-moon')
    ];
    return themes;
  }

  switchTheme(currentTheme: string): void {
    const newTheme = currentTheme === 'darkTheme' ? 'primaryTheme' : 'darkTheme';
    this.themeSub.next(newTheme);
  }

  private createThemeItem(id?: number, name?: string, themeKey?: string, icon?: string) {
    const themeItem: ITheme = { id, name, themeKey, icon };
    return themeItem;
  }
}
