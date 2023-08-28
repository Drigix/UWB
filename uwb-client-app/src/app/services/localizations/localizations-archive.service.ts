import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LocalizationsArchiveService {

  private resourceUrl = '../../../assets/data/data-heatmap-points.json';
  private resourceArchiveUrl = '../../../assets/data/data-localizations-archive.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findAllArchiveData(): Observable<any> {
    return this.http.get(this.resourceArchiveUrl);
  }
}
