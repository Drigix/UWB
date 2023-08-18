import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClientUnit } from '@entities/client/client-unit.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientUnitsService {

  private resourceUrl = '../../../assets/data/data-client-units.json';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  findByClientId(root: IClientUnit, id: number): IClientUnit | null {
    if (root.data.id === id) {
      return root;
    }

    for (const child of root.children) {
      const found = this.findByClientId(child, id);
      if (found) {
        return found;
      }
    }

    return null;
  }
}
