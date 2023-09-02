import { Injectable } from '@angular/core';
import { ILanguage } from '@entities/global/language.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class LanguagesService {
  constructor(private translateService: TranslateService) { }

  getLanguages(): ILanguage[] {
    const languages: ILanguage[] = [
      this.createLanguageItem(1, this.translateService.instant('profile.language.pl'), 'pl', '../../../assets/images/poland.png'),
      this.createLanguageItem(2, this.translateService.instant('profile.language.en'), 'en', '../../../assets/images/unitedkingdom.png')
    ];
    return languages;
  }

  private createLanguageItem(id?: number, name?: string, langKey?: string, img?: string): ILanguage {
    const language = { id, name, langKey, img };
    return language;
  }
}
