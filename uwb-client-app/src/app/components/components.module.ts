import { NgModule } from '@angular/core';
import { PrimeNGLibsModule } from '@shared/primeng-libs.module';
import { SharedModule } from 'primeng/api';
import { FormComponent } from './form/form.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { FormGridComponent } from './form/form-grid/form-grid.component';
import { SharedLibsModule } from '@shared/shared-libs.module';
import { UwbCalendarComponent } from './uwb-calendar/uwb-calendar.component';
import { UwbFooterButtonsComponent } from './uwb-footer-buttons/uwb-footer-buttons.component';


@NgModule({
  imports: [
    PrimeNGLibsModule,
    SharedModule,
    SharedLibsModule
  ],
  exports: [
    PrimeNGLibsModule,
    FormComponent,
    FormControlComponent,
    FormGridComponent,
    UwbCalendarComponent,
    UwbFooterButtonsComponent
  ],
  declarations: [
    FormComponent,
    FormControlComponent,
    FormGridComponent,
    UwbCalendarComponent,
    UwbFooterButtonsComponent
  ],
  providers: [],
})
export class ComponentsModule { }
