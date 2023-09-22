import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { ObjectTypeArrayResponseType, ObjectTypeResponseType } from '@entities/global/httpresponse-types.model';
import { IObjectType, NewObjectType } from '@entities/objects/object-type.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ObjectTypesService {

  private resourceUrl = API_URL + 'uwb-object-type';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<ObjectTypeArrayResponseType> {
    return this.http.get<IObjectType[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<ObjectTypeResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByUserOrganizationUnit(id: number): Observable<ObjectTypeArrayResponseType> {
    return this.http
      .get<IObjectType[]>(`${this.resourceUrl}/user-organization-unit/${id}`, {
        observe: 'response',
      });
    }

  create(objectType: NewObjectType): Observable<ObjectTypeResponseType> {
    return this.http.post(this.resourceUrl, objectType, { observe: 'response' });
  }

  update(objectType: NewObjectType): Observable<ObjectTypeResponseType> {
    return this.http.put(this.resourceUrl, objectType, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
