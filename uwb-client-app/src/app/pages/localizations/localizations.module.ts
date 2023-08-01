import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LocalizationsComponent } from './localizations.component';

const routes: Routes = [
  {
    path: 'localizations',
    component: LocalizationsComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LocalizationsComponent
  ],
  declarations: [
    LocalizationsComponent
  ],
  providers: [],
})
export class LocalizationsModule { }
