import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationTypesResponseType } from '@entities/global/httpresponse-types.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationTypesService {

  private resourceUrl = '../../../assets/data/data-notification-types.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<NotificationTypesResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
