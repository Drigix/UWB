import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginComponent
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
})
export class LoginModule { }
