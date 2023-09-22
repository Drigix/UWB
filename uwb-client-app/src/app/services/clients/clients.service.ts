import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient, NewClient } from '@entities/client/client.model';
import { ClientArrayResponseType, ClientResponseType, ClientUnitArrayResponseType, ClientUnitResponseType } from '@entities/global/httpresponse-types.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClientsService {

  private resourceUrl = API_URL + 'organization-unit';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<ClientArrayResponseType> {
    return this.http.get<IClient[]>(this.resourceUrl, { observe: 'response' });
  }

  findTree(): Observable<ClientUnitArrayResponseType> {
    return this.http.get<IClientUnit[]>(`${this.resourceUrl}/tree`, { observe: 'response' });
  }

  findById(id: number): Observable<ClientResponseType> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByIdFromUnits(root: IClientUnit, id: number): IClientUnit | null {
    if (root.data.id === id) {
      return root;
    }

    for (const child of root.children) {
      const found = this.findByIdFromUnits(child, id);
      if (found) {
        return found;
      }
    }

    return null;
  }

  save(client: NewClient): Observable<ClientResponseType> {
    return this.http.post(this.resourceUrl, client, { observe: 'response' });
  }

  update(client: IClient): Observable<ClientResponseType> {
    return this.http.put(this.resourceUrl, client, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' }).pipe(
      map(response => response.body as string)
    );
  }
}
