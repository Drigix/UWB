import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IconArrayResponseType, IconResponseType } from '@entities/global/httpresponse-types.model';
import { IIcon, NewIcon } from '@entities/icon/icon.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class IconsService {

  private resourceUrl = API_URL + 'uwb-object-icon';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<IconArrayResponseType> {
    return this.http.get<IIcon[]>(this.resourceUrl, { observe: 'response'});
  }

  findById(id: number): Observable<IconResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByUserOrganizationUnit(id: number): Observable<IconArrayResponseType> {
    return this.http
      .get<IIcon[]>(`${this.resourceUrl}/user-organization-unit/${id}`, {
        observe: 'response',
      });
  }

  create(icon: NewIcon): Observable<IconResponseType> {
    return this.http.post(this.resourceUrl, icon, { observe: 'response' });
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post(`${this.resourceUrl}/upload-file`, formData, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map((response) => response.body as string));
  }

  update(icon: NewIcon): Observable<IconResponseType> {
    return this.http.put(this.resourceUrl, icon, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http
      .delete(`${this.resourceUrl}/${id}`, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(map((response) => response.body as string));
  }
}
