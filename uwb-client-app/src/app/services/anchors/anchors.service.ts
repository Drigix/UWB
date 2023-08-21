import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAnchor, NewAnchor } from '@entities/anchor/anchor.model';
import { AnchorsResponseType } from '@entities/global/httpresponse-types.model';
import { NewObject } from '@entities/objects/object.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnchorsService {

  private resourceUrl = '../../../assets/data/data-anchors.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<AnchorsResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(anchor: NewAnchor): Observable<AnchorsResponseType> {
    return this.http.post(this.resourceUrl, anchor, { observe: 'response' });
  }

  update(anchor: IAnchor): Observable<AnchorsResponseType> {
    return this.http.put(this.resourceUrl, anchor, { observe: 'response' });
  }

  delete(id: number): Observable<AnchorsResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
