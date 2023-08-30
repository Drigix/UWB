import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsResponseType } from '@entities/global/httpresponse-types.model';
import { NewNotification } from '@entities/notification/notification.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationsService {

  private resourceUrl = '../../../assets/data/data-notifications.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<NotificationsResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(notification: NewNotification): Observable<NotificationsResponseType> {
    return this.http.post(this.resourceUrl, notification, { observe: 'response' });
  }

  update(notification: NewNotification): Observable<NotificationsResponseType> {
    return this.http.put(this.resourceUrl, notification, { observe: 'response' });
  }

  delete(id: number): Observable<NotificationsResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
