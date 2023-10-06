import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { LocalizationsArchiveArrayResponseType } from '@entities/global/httpresponse-types.model';
import { ILocalization } from '@entities/localization/localization.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocalizationsArchiveService {

  private resourceUrl = API_URL + 'localization-archive';

  constructor(
    private http: HttpClient
  ) { }

  findAllByTagIdAndDateBetween(tagId: string, dateFrom: Date, dateTo: Date): Observable<LocalizationsArchiveArrayResponseType> {
    return this.http.get<ILocalization[]>(`${this.resourceUrl}/${tagId}/${dateFrom}/${dateTo}`, { observe: 'response' });
  }
}
