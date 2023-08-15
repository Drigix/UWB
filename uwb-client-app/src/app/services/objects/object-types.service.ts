import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectTypeResponseType } from '@entities/global/httpresponse-types.model';
import { NewObjectType } from '@entities/objects/object-type.model';
import { NewObject } from '@entities/objects/object.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ObjectTypesService {

  private resourceUrl = '../../../assets/data/data-object-types.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<ObjectTypeResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(objectType: NewObjectType): Observable<ObjectTypeResponseType> {
    return this.http.post(this.resourceUrl, objectType, { observe: 'response' });
  }

  update(objectType: NewObjectType): Observable<ObjectTypeResponseType> {
    return this.http.put(this.resourceUrl, objectType, { observe: 'response' });
  }

  delete(id: number): Observable<ObjectTypeResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
