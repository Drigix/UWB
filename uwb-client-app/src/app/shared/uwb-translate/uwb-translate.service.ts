import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UwbTranslateService {
  constructor(
    private translateService: TranslateService
  ) { }

  async get(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const result = this.translateService.instant(key);
        resolve(result);
      }, 1);
    });
  }
}
