import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@config/api-url.constans';
import { ILogin } from '@entities/auth/login.model';
import { IUpdatePassword } from '@entities/auth/password.model';
import { IAuthenticationToken } from '@entities/auth/token.model';
import { AuthenticationTokenResponseType, UserResponseType } from '@entities/global/httpresponse-types.model';
import { IUser } from '@entities/user/user.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private resourceUrl = API_URL + 'authentication';

  constructor(
    private http: HttpClient
  ) { }

  login(login: ILogin): Observable<AuthenticationTokenResponseType> {
    return this.http.post(`${this.resourceUrl}/signin`, login, { observe: 'response' });
  }

  logout(): void {
    window.localStorage.clear();
    window.location.reload();
  }

  updatePassword(password: IUpdatePassword): Observable<UserResponseType> {
    return this.http.put<IUser>(`${this.resourceUrl}/password`, password, { observe: 'response' });
  }
}
