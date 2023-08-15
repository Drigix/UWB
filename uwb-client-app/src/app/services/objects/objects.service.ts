import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectResponseType } from '@entities/global/httpresponse-types.model';
import { NewObject } from '@entities/objects/object.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ObjectsService {

  private resourceUrl = '../../../assets/data/data-objects.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<ObjectResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(object: NewObject): Observable<ObjectResponseType> {
    return this.http.post(this.resourceUrl, object, { observe: 'response' });
  }

  update(object: NewObject): Observable<ObjectResponseType> {
    return this.http.put(this.resourceUrl, object, { observe: 'response' });
  }

  delete(id: number): Observable<ObjectResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
