import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArea } from '@entities/area/area.model';
import { Observable, map, switchMap } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({providedIn: 'root'})
export class AreasService {

  private resourceUrl = '../../../assets/data/data-areas.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }
}
