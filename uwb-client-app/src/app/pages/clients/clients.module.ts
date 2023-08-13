import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';

const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ClientsComponent,
    ClientsDialogComponent
  ],
  declarations: [
    ClientsComponent,
    ClientsDialogComponent
  ],
  providers: [],
})
export class ClientsModule { }
