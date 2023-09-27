import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AreaTypesComponent } from './area-types.component';
import { AreaTypesDialogComponent } from './area-types-dialog/area-types-dialog.component';

const routes: Routes = [
  {
    path: 'area-types',
    component: AreaTypesComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AreaTypesComponent,
    AreaTypesDialogComponent
  ],
  declarations: [
    AreaTypesComponent,
    AreaTypesDialogComponent
  ],
  providers: [],
})
export class AreaTypesModule { }
