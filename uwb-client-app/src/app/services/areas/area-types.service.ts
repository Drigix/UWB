import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AreaTypesService {

  private resourceUrl = '../../../assets/data/data-area-types.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }
}
