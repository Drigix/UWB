import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IAreaType, NewAreaType } from '@entities/area/area-type.model';
import { AreaTypeArrayResponseType, AreaTypeResponseType } from '@entities/global/httpresponse-types.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AreaTypesService {

  private resourceUrl = API_URL + 'area-type';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<AreaTypeArrayResponseType> {
    return this.http.get<IAreaType[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<AreaTypeResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByOrganizationUnit(id: number): Observable<AreaTypeArrayResponseType> {
    return this.http
      .get<IAreaType[]>(`${this.resourceUrl}/background/${id}`, {
        observe: 'response',
      })
    }

  create(areaType: NewAreaType): Observable<AreaTypeResponseType> {
    return this.http.post(this.resourceUrl, areaType, { observe: 'response' });
  }

  update(areaType: IAreaType): Observable<AreaTypeResponseType> {
    return this.http.put(this.resourceUrl, areaType, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
