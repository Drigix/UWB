import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { OccurenceMapComponent } from './occurence-map.component';

const routes: Routes = [
  {
    path: 'occurrence-map',
    component: OccurenceMapComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    OccurenceMapComponent
  ],
  declarations: [
    OccurenceMapComponent
  ],
  providers: [],
})
export class OccurenceMapModule { }
