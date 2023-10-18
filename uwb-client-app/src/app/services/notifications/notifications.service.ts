import { API_NOTIFICATION_URL, API_URL } from './../../config/api-url.constans';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationsArrayResponseType, NotificationsResponseType } from '@entities/global/httpresponse-types.model';
import { INotification, NewNotification } from '@entities/notification/notification.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationsService {

  private resourceUrl = API_NOTIFICATION_URL + 'notification-archive';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findAllByDates(dateFrom: Date, dateTo: Date): Observable<NotificationsArrayResponseType> {
    return this.http.get<INotification[]>(`${this.resourceUrl}/${dateFrom}/${dateTo}`, { observe: 'response' });
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
