import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAreaType } from '@entities/area/area-type.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { TranslateService } from '@ngx-translate/core';
import { AreaTypesService } from '@services/areas/area-types.service';
import { ClientsService } from '@services/clients/clients.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-area-types-dialog',
  templateUrl: './area-types-dialog.component.html'
})

export class AreaTypesDialogComponent implements OnInit {
  formGroup?: FormGroup;
  edit = false;
  selectedAreaType?: IAreaType;
  dropdownObjectTypeItems: IObjectType[] = [];
  treeSelectItems: IClientUnit[] = [];
  pageSelectedOrganizationUnit?: IClient;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private areaTypesService: AreaTypesService,
    private toastService: ToastService,
    private translateService: TranslateService,
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadOrganizationUnits();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedAreaType = this.config.data.selectedAreaType;
    this.pageSelectedOrganizationUnit = this.config.data.selectedOrganizationUnit;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      color: [{value: null, disabled: false}, [Validators.required]],
      organizationUnitId: [{value: null, disabled: false}, [Validators.required]],
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedAreaType?.name,
        color: this.selectedAreaType?.color,
        organizationUnitId: null,
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedAreaType?.organizationUnitId!);
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        } else {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.pageSelectedOrganizationUnit?.id!)!;
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        }
      }
    );
  }

  onSave(): void {
    let value = this.formGroup?.getRawValue();
    value = {...value, organizationUnitId: value.organizationUnitId.data.id}
    if(this.edit) {
      value.id = this.selectedAreaType?.id;
      this.areaTypesService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('areaType.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('areaType.dialog.editError')});
          }
        }
      );
    } else {
      this.areaTypesService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('areaType.dialog.addSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('areaType.dialog.addError')});
          }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
