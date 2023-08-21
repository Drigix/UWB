import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AnchorsComponent } from './anchors.component';
import { AnchorsDialogComponent } from './anchors-dialog/anchors-dialog.component';

const routes: Routes = [
  {
    path: 'anchors',
    component: AnchorsComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AnchorsComponent,
    AnchorsDialogComponent
  ],
  declarations: [
    AnchorsComponent,
    AnchorsDialogComponent
  ],
  providers: [],
})
export class AnchorsModule { }
