import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IAnchor, NewAnchor } from '@entities/anchor/anchor.model';
import { AnchorsArrayResponseType, AnchorsResponseType } from '@entities/global/httpresponse-types.model';
import { NewObject } from '@entities/objects/object.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnchorsService {

  private resourceUrl = API_URL + 'anchor';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<AnchorsArrayResponseType> {
    return this.http.get<IAnchor[]>(this.resourceUrl, { observe: 'response' });
  }

  findById(id: number): Observable<AnchorsResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findAllByBackground(id: number): Observable<AnchorsArrayResponseType> {
    return this.http
      .get<IAnchor[]>(`${this.resourceUrl}/background/${id}`, {
        observe: 'response',
      })
    }

  create(anchor: NewAnchor): Observable<AnchorsResponseType> {
    return this.http.post(this.resourceUrl, anchor, { observe: 'response' });
  }

  update(anchor: IAnchor): Observable<AnchorsResponseType> {
    return this.http.put(this.resourceUrl, anchor, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text',
    })
    .pipe(map((response) => response.body as string));
  }
}
