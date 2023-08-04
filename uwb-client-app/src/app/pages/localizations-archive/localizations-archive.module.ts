import { NgModule } from '@angular/core';
import { ComponentsModule } from '@components/components.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LocalizationsArchiveComponent } from './localizations-archive.component';

const routes: Routes = [
  {
    path: 'localizations-archive',
    component: LocalizationsArchiveComponent
  }
];

@NgModule({
  imports: [
    ComponentsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LocalizationsArchiveComponent
  ],
  declarations: [
    LocalizationsArchiveComponent
  ],
  providers: [],
})
export class LocalizationsArchiveModule { }
