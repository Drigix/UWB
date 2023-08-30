import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsConfigResponseType, NotificationsResponseType } from '@entities/global/httpresponse-types.model';
import { NewNotificationConfig } from '@entities/notification/notification-config.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationsConfigService {

  private resourceUrl = '../../../assets/data/data-notifications-config.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<NotificationsConfigResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(notificationConfig: NewNotificationConfig): Observable<NotificationsConfigResponseType> {
    return this.http.post(this.resourceUrl, notificationConfig, { observe: 'response' });
  }

  update(notificationConfig: NewNotificationConfig): Observable<NotificationsConfigResponseType> {
    return this.http.put(this.resourceUrl, notificationConfig, { observe: 'response' });
  }

  delete(id: number): Observable<NotificationsConfigResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
