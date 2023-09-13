import { Injectable } from '@angular/core';
import { IRole } from '@entities/auth/role.model';
import { IAuthenticationToken } from '@entities/auth/token.model';
import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthorityService {

 accessToken?: IAuthenticationToken;
 userRoles: string[] = [];

 setAccessToken(accessToken: IAuthenticationToken): void {
    window.localStorage.setItem('access_token', accessToken.token!);
    const decodeToken: any = jwt_decode(accessToken.token!);
    this.countTokenTime(decodeToken['exp']);
 }

 getAccessToken(): string {
   return window.localStorage.getItem('access_token')!;
 }

 isAuthenticated(): boolean {
    return window.localStorage.getItem('access_token') ? true : false;
 }

 getUserRoles(): string[] {
    return this.userRoles;
 }

 setUserRoles(roles: IRole[]): void {
    this.userRoles = roles.map( role => role.name!);
 }

 setAutoLogout(): void {
    const expTimeString = window.localStorage.getItem('access_token_exp')?.split(':');

    const expirationTime = new Date();
    expirationTime.setHours(parseInt(expTimeString![0], 10));
    expirationTime.setMinutes(parseInt(expTimeString![1], 10));
    const currentTime = new Date();
    const timeRemaining = expirationTime.getTime() - currentTime.getTime();
    if (timeRemaining <= 0) {
      window.localStorage.clear();
      window.location.reload();
    } else {
      setTimeout(() => {
        window.localStorage.clear();
        window.location.reload();
      }, timeRemaining);
    }
 }

 private countTokenTime(expirationInSeconds: number): void {
  const expirationDate = new Date(expirationInSeconds * 1000);
  const hours = expirationDate.getHours();
  const minutes = expirationDate.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  window.localStorage.setItem('access_token_exp', formattedTime);
 }

}
