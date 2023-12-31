import { Injectable } from '@angular/core';
import { IRole } from '@entities/auth/role.model';
import { IAuthenticationToken } from '@entities/auth/token.model';
import { DateService } from '@shared/date/date.service';
import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthorityService {

 accessToken?: IAuthenticationToken;
 userRoles: string[] = [];
 userOrganizationUnitId?: number;

 constructor(private dateService: DateService) {}

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

 getUserOrganizationUnitId(): number {
    return this.userOrganizationUnitId!;
 }

 setUserOrganizationUnitId(organizationUnitId: number): void {
    this.userOrganizationUnitId = organizationUnitId;
 }

 setAutoLogout(): void {
    const expDateString = window.localStorage.getItem('access_token_date_exp');
    const expTimeString = window.localStorage.getItem('access_token_exp')?.split(':');
    const expirationTime = new Date();
    expirationTime.setHours(parseInt(expTimeString![0], 10));
    expirationTime.setMinutes(parseInt(expTimeString![1], 10));
    const currentTime = new Date();
    const timeRemaining = expirationTime.getTime() - currentTime.getTime();
    if (!this.dateService.checkIfDateEquals(new Date(expDateString!), currentTime) || timeRemaining <= 0) {
      window.localStorage.clear();
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
  window.localStorage.setItem('access_token_date_exp', this.dateService.formatDateWithoutTime(new Date()))
  window.localStorage.setItem('access_token_exp', formattedTime);
 }
}
