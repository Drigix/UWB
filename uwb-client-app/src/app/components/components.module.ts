import { NgModule } from '@angular/core';
import { PrimeNGLibsModule } from '@shared/primeng-libs.module';
import { SharedModule } from 'primeng/api';
import { FormComponent } from './form/form.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { FormGridComponent } from './form/form-grid/form-grid.component';
import { SharedLibsModule } from '@shared/shared-libs.module';
import { UwbCalendarComponent } from './uwb-calendar/uwb-calendar.component';
import { UwbFooterButtonsComponent } from './uwb-footer-buttons/uwb-footer-buttons.component';
import { UwbProfileComponent } from './uwb-profile/uwb-profile.component';
import { UwbSingleSelectComponent } from './uwb-single-select/uwb-single-select.component';
import { UwbMultiSelectComponent } from './uwb-multi-select/uwb-multi-select.component';
import { UwbOverlayComponent } from './uwb-overlay/uwb-overlay.component';
import { UwbTableComponent } from './uwb-table/uwb-table.component';
import { UwbMap } from './uwb-map/uwb-map.component';
import { UwbHeatmapComponent } from './uwb-heatmap/uwb-heatmap.component';
import { UwbFileUploadComponent } from './uwb-file-upload/uwb-file-upload.component';
import { UwbDialogComponent } from './uwb-dialog/uwb-dialog.component';


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
    UwbFooterButtonsComponent,
    UwbProfileComponent,
    UwbSingleSelectComponent,
    UwbMultiSelectComponent,
    UwbOverlayComponent,
    UwbTableComponent,
    UwbMap,
    UwbHeatmapComponent,
    UwbFileUploadComponent,
    UwbDialogComponent
  ],
  declarations: [
    FormComponent,
    FormControlComponent,
    FormGridComponent,
    UwbCalendarComponent,
    UwbFooterButtonsComponent,
    UwbProfileComponent,
    UwbSingleSelectComponent,
    UwbMultiSelectComponent,
    UwbOverlayComponent,
    UwbTableComponent,
    UwbMap,
    UwbHeatmapComponent,
    UwbFileUploadComponent,
    UwbDialogComponent
  ],
  providers: [],
})
export class ComponentsModule { }
