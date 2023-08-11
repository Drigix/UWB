import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBackground, NewBackground } from '@entities/background/background.model';
import { BackgroundResponseType } from '@entities/global/httpresponse-types.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BackgroundsService {

  private resourceUrl = '../../../assets/data/data-backgrounds.json';
  private entityResponseType = HttpResponse<IBackground>;
  private entityArrayResponseType = HttpResponse<IBackground>;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<BackgroundResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(background: NewBackground): Observable<BackgroundResponseType> {
    return this.http.post(this.resourceUrl, background, { observe: 'response' });
  }

  update(background: IBackground): Observable<BackgroundResponseType> {
    return this.http.put(this.resourceUrl, background, { observe: 'response' });
  }

  delete(id: number): Observable<BackgroundResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
