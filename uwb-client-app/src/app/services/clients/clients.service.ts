import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient, NewClient } from '@entities/client/client.model';
import { ClientResponseType } from '@entities/global/httpresponse-types.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientsService {

  private resourceUrl = '../../../assets/data/data-clients.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<ClientResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(client: NewClient): Observable<ClientResponseType> {
    return this.http.post(this.resourceUrl, client, { observe: 'response' });
  }

  update(client: IClient): Observable<ClientResponseType> {
    return this.http.put(this.resourceUrl, client, { observe: 'response' });
  }

  delete(id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
