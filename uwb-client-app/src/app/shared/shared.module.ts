import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { UwbSpinnerDirective } from './uwb-spinner/ubw-spinner.directive';
import { UwbSpinnerComponent } from './uwb-spinner/uwb-spinner.component';
import { MessageService } from 'primeng/api';
import { FormatDatePipe } from './date/format-date.pipe';
import { FormatDatetimePipe } from './date/format-datetime.pipe';


@NgModule({
  imports: [
    SharedLibsModule
  ],
  declarations: [
    UwbSpinnerDirective,
    UwbSpinnerComponent,
    FormatDatePipe,
    FormatDatetimePipe
  ],
  exports: [
    SharedLibsModule,
    UwbSpinnerDirective,
    FormatDatePipe,
    FormatDatetimePipe
  ],
  providers: [
    MessageService
  ],
})
export class SharedModule { }
