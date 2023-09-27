import { authGuard } from '@config/user-route-access.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_ACCESS, LOGGED_USER_ACCESS } from '@auth/role-access.type';

@NgModule({
  imports: [
    RouterModule.forChild(
      [
        {
          path: '',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
        },
        {
          path: '',
          data: {
            authorities: ADMIN_ACCESS
          },
          loadChildren: () => import('./user/user.module').then(m => m.UserModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./localizations/localizations.module').then(m => m.LocalizationsModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./localizations-archive/localizations-archive.module').then(m => m.LocalizationsArchiveModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./area-types/area-types.module').then(m => m.AreaTypesModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./backgrounds/backgrounds.module').then(m => m.BackgroundsModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./objects/objects.module').then(m => m.ObjectsModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./anchors/anchors.module').then(m => m.AnchorsModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./occurence-map/occurence-map.module').then(m => m.OccurenceMapModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
          canActivate: [authGuard]
        },
        {
          path: '',
          data: {
            authorities: LOGGED_USER_ACCESS
          },
          loadChildren: () => import('./notifications-config/notifications-config.module').then(m => m.NotificationsConfigModule),
          canActivate: [authGuard]
        }
      ]
    )
  ]
})
export class PagesRoutingModule { }
