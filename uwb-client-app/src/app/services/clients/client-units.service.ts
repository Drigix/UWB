import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClient, NewClient } from '@entities/client/client.model';
import { ClientResponseType } from '@entities/global/httpresponse-types.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientUnitsService {

  private resourceUrl = '../../../assets/data/data-client-units.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }
}
