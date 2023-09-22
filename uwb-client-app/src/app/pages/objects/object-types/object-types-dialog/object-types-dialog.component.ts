import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IIcon } from '@entities/icon/icon.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientsService } from '@services/clients/clients.service';
import { IconsService } from '@services/icon/icons.service';
import { ObjectTypesService } from '@services/objects/object-types.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-object-types-dialog',
  templateUrl: './object-types-dialog.component.html'
})

export class ObjectTypesDialogComponent implements OnInit {

  formGroup?: FormGroup;
  edit = false;
  selectedObjectType?: IObjectType;
  treeSelectItems: IClientUnit[] = [];
  dropdownItems: IIcon[] = [];
  selectedClient?: IClientUnit;
  pageSelectedOrganizationUnit?: IClient;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private iconsService: IconsService,
    private objectTypesService: ObjectTypesService,
    private toastService: ToastService,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadOrganizationUnits();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedObjectType = this.config.data.selectedObjectType;
    this.pageSelectedOrganizationUnit = this.config.data.selectedOrganizationUnit;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      organizationUnitId: [{value: null, disabled: false}, [Validators.required]],
      uwbObjectIconId: [{value: null, disabled: false}, [Validators.required]],
      adminOnly: [{value: false, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.loadIcons(this.selectedObjectType?.organizationUnitId!);
      this.formGroup.patchValue({
        name: this.selectedObjectType?.name,
        organizationUnitId: null,
        uwbObjectIconId: this.selectedObjectType?.uwbObjectIcon?.id,
        adminOnly: this.selectedObjectType?.adminOnly
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedObjectType?.organizationUnitId!);
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        } else {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.pageSelectedOrganizationUnit?.id!)!;
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
          this.loadIcons(serachOrgUnit.data.id!);
        }
      }
    );
  }

  loadIcons(organizationUnitId: number): void {
    this.iconsService.findAllByUserOrganizationUnit(organizationUnitId).subscribe(
      (res: HttpResponse<IIcon[]>) => {
        this.dropdownItems = res.body ?? [];
        if(this.dropdownItems.length === 1) {
          this.formGroup?.get('uwbObjectIconId')?.setValue(this.dropdownItems[0].id);
        }
      }
    );
  }

  onOrganizationUnitSelected(organizationUnit: IClient): void {
    this.loadIcons(organizationUnit.id!);
  }

  onSave(): void {
    let value = this.formGroup?.getRawValue();
    value = { ...value, organizationUnitId: value.organizationUnitId.data.id };
    if(this.edit) {
      value.id = this.selectedObjectType?.id;
      this.objectTypesService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('objectType.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('objectType.dialog.editError')});
          }
        }
      );
    } else {
      this.objectTypesService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('objectType.dialog.addSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('objectType.dialog.addError')});
          }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
