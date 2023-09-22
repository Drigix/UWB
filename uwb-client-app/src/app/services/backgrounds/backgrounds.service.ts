import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import {
  IBackground,
  NewBackground,
} from '@entities/background/background.model';
import {
  BackgroundArrayResponseType,
  BackgroundResponseType,
} from '@entities/global/httpresponse-types.model';
import { UploadEvent } from '@entities/uwb-file-upload/upload-event.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackgroundsService {
  private resourceUrl = API_URL + 'background';

  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  // findAll(): Observable<BackgroundArrayResponseType> {
  //   return this.http.get<IBackground[]>(this.resourceUrl, { observe: 'response' });
  // }

  findAllByUserOrganizationUnit(id: number): Observable<BackgroundArrayResponseType> {
    return this.http
      .get<IBackground[]>(`${this.resourceUrl}/user-organization-unit/${id}`, {
        observe: 'response',
      });
  }

  findById(id: number): Observable<BackgroundResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  create(background: NewBackground): Observable<BackgroundResponseType> {
    return this.http.post(this.resourceUrl, background, {
      observe: 'response',
    });
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

  update(background: IBackground): Observable<BackgroundResponseType> {
    return this.http.put(this.resourceUrl, background, { observe: 'response' });
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
