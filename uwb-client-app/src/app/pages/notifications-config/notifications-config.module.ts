import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsConfigDialogComponent } from './notifications-config-dialog/notifications-config-dialog.component';
import { NotificationsConfigComponent } from './notifications-config.component';

const routes: Routes = [
  {
    path: 'notifications-config',
    component: NotificationsConfigComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    NotificationsConfigComponent,
    NotificationsConfigDialogComponent
  ],
  declarations: [
    NotificationsConfigComponent,
    NotificationsConfigDialogComponent
  ],
  providers: [],
})
export class NotificationsConfigModule { }
