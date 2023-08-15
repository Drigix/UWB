import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ObjectsComponent } from './objects.component';
import { ObjectTypesComponent } from './object-types/object-types.component';
import { ObjectIconsComponent } from './object-icons/object-icons.component';
import { ObjectsDialogComponent } from './objects-dialog/objects-dialog.component';
import { ObjectTypesDialogComponent } from './object-types/object-types-dialog/object-types-dialog.component';
import { ObjectIconsDialogComponent } from './object-icons/object-icons-dialog/object-icons-dialog.component';

const routes: Routes = [
  {
    path: 'objects',
    component: ObjectsComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ObjectsComponent,
    ObjectTypesComponent,
    ObjectIconsComponent,
    ObjectsDialogComponent,
    ObjectTypesDialogComponent,
    ObjectIconsDialogComponent
  ],
  declarations: [
    ObjectsComponent,
    ObjectTypesComponent,
    ObjectIconsComponent,
    ObjectsDialogComponent,
    ObjectTypesDialogComponent,
    ObjectIconsDialogComponent
  ],
  providers: [],
})
export class ObjectsModule { }
