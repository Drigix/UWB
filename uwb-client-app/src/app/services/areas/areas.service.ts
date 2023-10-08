import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArea, NewArea } from '@entities/area/area.model';
import { Observable, map } from 'rxjs';
import { API_URL } from '@config/api-url.constans';
import { AreaArrayResponseType, AreaResponseType, ObjectResponseType } from '@entities/global/httpresponse-types.model';

@Injectable({providedIn: 'root'})
export class AreasService {

  private resourceUrl = API_URL + 'area';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<AreaArrayResponseType> {
    return this.http.get<IArea[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<AreaResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByBackground(id: number): Observable<AreaArrayResponseType> {
    return this.http
      .get<IArea[]>(`${this.resourceUrl}/background/${id}`, {
        observe: 'response',
      })
  }

  findAllByOrganizationUnit(id: number): Observable<AreaArrayResponseType> {
    return this.http
      .get<IArea[]>(`${this.resourceUrl}/organization-unit/${id}`, {
        observe: 'response',
      })
  }

  create(area: NewArea): Observable<AreaResponseType> {
    return this.http.post(this.resourceUrl, area, { observe: 'response' });
  }

  update(area: IArea): Observable<AreaResponseType> {
    return this.http.put(this.resourceUrl, area, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
