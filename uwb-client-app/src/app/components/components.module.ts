import { NgModule } from '@angular/core';
import { PrimeNGLibsModule } from '@shared/primeng-libs.module';
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
import { UwbTreeTableComponent } from './uwb-tree-table/uwb-tree-table.component';
import { UwbTreeSelectComponent } from './uwb-tree-select/uwb-tree-select.component';
import { UwbMapAnchorsComponent } from './uwb-map/uwb-map-anchors.component';
import { UwbMapAreasComponent } from './uwb-map/uwb-map-areas.component';
import { UwbMapLocalizationsComponent } from './uwb-map/uwb-map-localizations.component';
import { UwbMapPanelComponent } from './uwb-map-panel/uwb-map-panel.component';
import { UwbMapLocalizationsArchiveComponent } from './uwb-map/uwb-map-localizations-archive.component';
import { UwbProfileSettingsComponent } from './uwb-profile/uwb-profile-settings/uwb-profile-settings.component';
import { UwbProfilePasswordComponent } from './uwb-profile/uwb-profile-password/uwb-profile-password.component';
import { UwbProfileProfileComponent } from './uwb-profile/uwb-profile-profile/uwb-profile-profile.component';
import { SharedModule } from '@shared/shared.module';


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
    UwbMapAnchorsComponent,
    UwbMapAreasComponent,
    UwbMapLocalizationsComponent,
    UwbMapLocalizationsArchiveComponent,
    UwbHeatmapComponent,
    UwbFileUploadComponent,
    UwbDialogComponent,
    UwbTreeTableComponent,
    UwbTreeSelectComponent,
    UwbMapPanelComponent,
    UwbProfileSettingsComponent,
    UwbProfilePasswordComponent,
    UwbProfileProfileComponent
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
    UwbMapAnchorsComponent,
    UwbMapAreasComponent,
    UwbMapLocalizationsComponent,
    UwbMapLocalizationsArchiveComponent,
    UwbHeatmapComponent,
    UwbFileUploadComponent,
    UwbDialogComponent,
    UwbTreeTableComponent,
    UwbTreeSelectComponent,
    UwbMapPanelComponent,
    UwbProfileSettingsComponent,
    UwbProfilePasswordComponent,
    UwbProfileProfileComponent
  ],
  providers: [],
})
export class ComponentsModule { }
