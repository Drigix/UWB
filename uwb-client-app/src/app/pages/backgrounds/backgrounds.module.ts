import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundsComponent } from './backgrounds.component';
import { BackgroundsDialogComponent } from './backgrounds-dialog/backgrounds-dialog.component';
import { CalibrateDialogComponent } from './calibrate-dialog/calibrate-dialog.component';

const routes: Routes = [
  {
    path: 'backgrounds',
    component: BackgroundsComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    BackgroundsComponent,
    BackgroundsDialogComponent,
    CalibrateDialogComponent
  ],
  declarations: [
    BackgroundsComponent,
    BackgroundsDialogComponent,
    CalibrateDialogComponent
  ],
  providers: [],
})
export class BackgroundsModule { }
