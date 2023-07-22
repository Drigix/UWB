import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UwbTranslateService {
  constructor(
    private translateService: TranslateService
  ) { }

  get(key: string): Observable<string> {
    return this.translateService.get(key).pipe(
      map((translated: string) => {
        return translated;
      })
    );
  }
}
