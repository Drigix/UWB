import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { ObjectArrayResponseType, ObjectResponseType } from '@entities/global/httpresponse-types.model';
import { IObject, NewObject } from '@entities/objects/object.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ObjectsService {

  private resourceUrl = API_URL + 'uwb-object';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<ObjectArrayResponseType> {
    return this.http.get<IObject[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<ObjectResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByUserOrganizationUnit(id: number): Observable<ObjectArrayResponseType> {
    return this.http
      .get<IObject[]>(`${this.resourceUrl}/user-organization-unit/${id}`, {
        observe: 'response',
      })
    }

  create(object: NewObject): Observable<ObjectResponseType> {
    return this.http.post(this.resourceUrl, object, { observe: 'response' });
  }

  update(object: IObject): Observable<ObjectResponseType> {
    return this.http.put(this.resourceUrl, object, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
