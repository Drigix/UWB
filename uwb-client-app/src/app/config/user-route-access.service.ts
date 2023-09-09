import { inject, Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthorityService } from '../auth/authority.service';

@Injectable(
  {providedIn: 'root'}
)
export class UserRouteAccessService {

    constructor(private router: Router,
      private authorityService: AuthorityService
      ) {
    }

    hasAnyAuthority(authorities: string[] | string): Observable<boolean> {
      const userRoles = this.authorityService.getUserRoles();
      if (!userRoles) {
        return of(false);
      }
      if (!Array.isArray(authorities)) {
        authorities = [authorities];
      }
      return of(authorities.some((authority: string) => userRoles.includes(authority)));
    }
}

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authService = inject(UserRouteAccessService);
  return authService.hasAnyAuthority(route.data['authorities']);
};
