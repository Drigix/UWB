import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { NotificationsConfigArrayResponseType, NotificationsConfigResponseType, NotificationsResponseType } from '@entities/global/httpresponse-types.model';
import { INotificationConfig, NewNotificationConfig } from '@entities/notification/notification-config.model';
import { INotificationType } from '@entities/notification/notification-type.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationsConfigService {

  private resourceUrl = API_URL + 'notification-config';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<NotificationsConfigArrayResponseType> {
    return this.http.get<INotificationConfig[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<NotificationsConfigResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  create(notificationConfig: NewNotificationConfig): Observable<NotificationsConfigResponseType> {
    return this.http.post(this.resourceUrl, notificationConfig, { observe: 'response' });
  }

  update(notificationConfig: INotificationConfig): Observable<NotificationsConfigResponseType> {
    return this.http.put(this.resourceUrl, notificationConfig, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
