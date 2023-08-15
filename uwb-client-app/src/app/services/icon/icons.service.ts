import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IconResponseType } from '@entities/global/httpresponse-types.model';
import { NewIcon } from '@entities/icon/icon.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class IconsService {

  private resourceUrl = '../../../assets/data/data-icons.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findById(id: number): Observable<IconResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  save(icon: NewIcon): Observable<IconResponseType> {
    return this.http.post(this.resourceUrl, icon, { observe: 'response' });
  }

  update(icon: NewIcon): Observable<IconResponseType> {
    return this.http.put(this.resourceUrl, icon, { observe: 'response' });
  }

  delete(id: number): Observable<IconResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
