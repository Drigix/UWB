import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IAreaVertex, NewAreaVertex } from '@entities/area/area-vertex.model';
import { AreaArrayResponseType, AreaVertexArrayResponseType, AreaVertexResponseType } from '@entities/global/httpresponse-types.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AreaVertexesService {

  private resourceUrl = API_URL + 'area-vertex';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<AreaVertexArrayResponseType> {
    return this.http.get<IAreaVertex[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<AreaVertexResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByBackground(id: number): Observable<AreaVertexArrayResponseType> {
    return this.http
      .get<IAreaVertex[]>(`${this.resourceUrl}/background/${id}`, {
        observe: 'response',
      })
  }

  findAllByArea(id: number): Observable<AreaVertexArrayResponseType> {
    return this.http
      .get<IAreaVertex[]>(`${this.resourceUrl}/area/${id}`, {
        observe: 'response',
      })
  }

  create(areaVertex: NewAreaVertex): Observable<AreaVertexResponseType> {
    return this.http.post(this.resourceUrl, areaVertex, { observe: 'response' });
  }

  createList(areaVertexes: NewAreaVertex[]): Observable<AreaArrayResponseType> {
    return this.http.post<IAreaVertex[]>(`${this.resourceUrl}/vertex-list`, areaVertexes, { observe: 'response' });
  }

  update(areaVertex: IAreaVertex): Observable<AreaVertexResponseType> {
    return this.http.put(this.resourceUrl, areaVertex, { observe: 'response' });
  }

  updateList(areaVertexes: IAreaVertex[]): Observable<AreaArrayResponseType> {
    return this.http.put<IAreaVertex[]>(`${this.resourceUrl}/vertex-list`, areaVertexes, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }

  deleteList(ids: number[]): Observable<string> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.delete(`${this.resourceUrl}/vertex-list`, {
      params: params,
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
