import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme$: Observable<string>;
  private themeSub: BehaviorSubject<string>;
  private LAST_SAVED_THEME_KEY = 'lastSavedColorTheme';
  private DEFAULT_THEME = 'primaryTheme';

  constructor() {
    this.themeSub = new BehaviorSubject<string>(this.DEFAULT_THEME);
    this.theme$ = this.themeSub.asObservable();
  }

  switchTheme(accountLogin: string): void {
    const currentTheme = this.getUserThemeFromLocalStorage(accountLogin);
    const newTheme = currentTheme === 'darkTheme' ? 'primaryTheme' : 'darkTheme';
    this.setUserThemeInLocalStorage(accountLogin, newTheme);
    this.themeSub.next(newTheme);
  }

  setUserThemeOrDefault(accountLogin: string): void {
    const userTheme = this.getUserThemeFromLocalStorage(accountLogin);
    let theme;
    if (userTheme != null) {
      theme = userTheme;
    } else {
      theme = this.getLastSavedTheme();
    }
    this.setUserThemeInLocalStorage(accountLogin, theme);
    this.themeSub.next(theme);
  }

  getLastSavedTheme(): string{
    return window.localStorage.getItem(this.LAST_SAVED_THEME_KEY)??this.DEFAULT_THEME;
  }

  private getUserThemeFromLocalStorage(accountLogin: string): string | null {
    return window.localStorage.getItem(`${accountLogin}_colorTheme`);
  }

  private setUserThemeInLocalStorage(accountLogin: string, themeName: string): void {
    window.localStorage.setItem(`${accountLogin}_colorTheme`, themeName);
    window.localStorage.setItem(this.LAST_SAVED_THEME_KEY, themeName);
  }
}
