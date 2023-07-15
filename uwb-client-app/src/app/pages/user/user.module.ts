import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UserComponent
  ],
  declarations: [
    UserComponent
  ],
  providers: [],
})
export class UserModule { }
