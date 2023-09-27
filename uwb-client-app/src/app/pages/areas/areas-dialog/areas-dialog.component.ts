import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAreaType } from '@entities/area/area-type.model';
import { IArea } from '@entities/area/area.model';
import { IBackground } from '@entities/background/background.model';
import { TranslateService } from '@ngx-translate/core';
import { AreaTypesService } from '@services/areas/area-types.service';
import { AreasService } from '@services/areas/areas.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-areas-dialog',
  templateUrl: './areas-dialog.component.html',
})
export class AreasDialogComponent implements OnInit {

  formGroup?: FormGroup;
  dropdownItems: IAreaType[] = [];
  edit = false;
  selectedBackground?: IBackground;
  selectedArea?: IArea;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private areasService: AreasService,
    private areaTypesServices: AreaTypesService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadAreaTypes();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedBackground = this.config.data.selectedBackground;
    this.selectedArea = this.config.data.selectedArea;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      areaTypeId: [{value: null, disabled: false}, [Validators.required]],
      color: [{value: null, disabled: false}, [Validators.required]],
      backgroundId: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedArea?.name,
        areaTypeId: this.selectedArea?.areaType?.id,
        color: this.selectedArea?.color,
        backgroundId: this.selectedArea?.backgroundId,
      });
    } else {
      this.formGroup.patchValue({
        backgroundId: this.selectedBackground?.id,
      });
    }
  }

  loadAreaTypes(): void {
    this.areaTypesServices.findAllByOrganizationUnit(this.selectedBackground?.organizationUnitId!).subscribe(
      (res: HttpResponse<IAreaType[]>) => {
        this.dropdownItems = res.body ?? [];
      }
    );
  }

  onAreaTypeChange(areaTypeId: number): void {
    const serachAreaType = this.dropdownItems.find(areaType => areaType.id === areaTypeId);
    this.formGroup?.get('color')?.setValue(serachAreaType?.color);
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    if(this.edit) {
      value.id = this.selectedArea?.id;
      this.areasService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('area.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('area.dialog.editError')});
          }
        }
      );
    } else {
      this.areasService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('area.dialog.addSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('area.dialog.addError')});
          }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
