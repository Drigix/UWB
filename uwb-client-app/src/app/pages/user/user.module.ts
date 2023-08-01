import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

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
    UserComponent,
    UserDialogComponent
  ],
  declarations: [
    UserComponent,
    UserDialogComponent
  ],
  providers: [],
})
export class UserModule { }
