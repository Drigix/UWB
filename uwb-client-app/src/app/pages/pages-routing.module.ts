import { authGuard } from '@config/user-route-access.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(
      [
        {
          path: '',
          loadChildren: () => import('./user/user.module').then(m => m.UserModule)
         },
      ]
    )
  ]
})
export class PagesRoutingModule { }