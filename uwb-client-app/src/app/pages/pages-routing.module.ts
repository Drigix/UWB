import { authGuard } from '@config/user-route-access.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
          loadChildren: () => import('./user/user.module').then(m => m.UserModule)
        },
        {
          path: '',
          loadChildren: () => import('./localizations/localizations.module').then(m => m.LocalizationsModule)
        },
        {
          path: '',
          loadChildren: () => import('./localizations-archive/localizations-archive.module').then(m => m.LocalizationsArchiveModule)
        },
        {
          path: '',
          loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule)
        },
        {
          path: '',
          loadChildren: () => import('./backgrounds/backgrounds.module').then(m => m.BackgroundsModule)
        },
        {
          path: '',
          loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
        }
      ]
    )
  ]
})
export class PagesRoutingModule { }
