import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthorityService {

  private isUserAuthenticate = false;
  private userRole = '';
  private accessToken?: any;

  constructor() { }

  private setAuthenticationProperties(): void {
    this.setUserAuthenticate(this.checkAuthentication());
    if(this.isUserAuthenticate) {
      const decodeAccessToken = this.decodeAccessToken();
      this.setUserRole(decodeAccessToken['role']);
    }
  }

  private checkAuthentication(): boolean {
    this.accessToken = this.getToken();
    return (this.accessToken !== null && this.accessToken !== undefined && this.accessToken !== '') ?? false;
  }

  private decodeAccessToken(): any {
    if(this.accessToken) {
      return jwt_decode(this.accessToken);
    }
  }

  private setUserAuthenticate(auth: boolean): void {
    this.isUserAuthenticate = auth;
  }

  private setUserRole(role: string): void {
    this.userRole = role;
  }

  setToken(token: string, expirationDate: string): void {
    window.sessionStorage.setItem('accessToken', token);
    window.sessionStorage.setItem('expirationDate', expirationDate);
  }

  getToken(): string {
    return window.sessionStorage.getItem('accessToken')!;
  }

  getUserAuthenticate(): boolean {
    this.setAuthenticationProperties();
    return this.isUserAuthenticate;
  }

  getUserRole(): string {
    return this.userRole;
  }

}
