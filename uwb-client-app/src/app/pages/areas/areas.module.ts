import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AreasComponent } from './areas.component';
import { AreasDialogComponent } from './areas-dialog/areas-dialog.component';

const routes: Routes = [
  {
    path: 'areas',
    component: AreasComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AreasComponent,
    AreasDialogComponent
  ],
  declarations: [
    AreasComponent,
    AreasDialogComponent
  ],
  providers: [],
})
export class AreasModule { }
