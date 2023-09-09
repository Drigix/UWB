import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { IUpdatePassword } from '@entities/auth/password.model';
import { UserResponseType } from '@entities/global/httpresponse-types.model';
import { IUser, UpdateUser } from '@entities/user/user.model';
import { Observable } from 'rxjs';

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

  update(user: UpdateUser): Observable<UserResponseType> {
    return this.http.put<IUser>(`${this.resourceUrl}`, user, { observe: 'response' });
  }
}
