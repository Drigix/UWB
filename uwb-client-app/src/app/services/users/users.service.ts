import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IUpdatePassword } from '@entities/auth/password.model';
import { UserResponseType } from '@entities/global/httpresponse-types.model';
import { IUser, NewUser, UpdateUser } from '@entities/user/user.model';
import { Observable, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsersService {

  private resourceUrl = API_URL + 'user';

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this.http.get(this.resourceUrl);
  }

  getAccount(): Observable<UserResponseType> {
    return this.http.get<IUser>(`${this.resourceUrl}/account`, { observe: 'response' });
  }

  create(user: NewUser): Observable<UserResponseType> {
    return this.http.post<IUser>(`${this.resourceUrl}`, user, { observe: 'response' });
  }

  update(user: UpdateUser): Observable<UserResponseType> {
    return this.http.put<IUser>(`${this.resourceUrl}`, user, { observe: 'response' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' }).pipe(
      map(response => response.body as string)
    );
  }
}
