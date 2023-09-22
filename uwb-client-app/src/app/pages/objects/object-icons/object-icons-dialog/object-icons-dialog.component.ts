import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IIcon, NewIcon } from '@entities/icon/icon.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientsService } from '@services/clients/clients.service';
import { IconsService } from '@services/icon/icons.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-object-icons-dialog',
  templateUrl: './object-icons-dialog.component.html'
})

export class ObjectIconsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  treeSelectItems: IClientUnit[] = [];
  edit = false;
  selectedIcon?: IIcon;
  uploadedIcon?: NewIcon;
  uploadedFile?: File;
  pageSelectedOrganizationUnit?: IClient;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private iconsService: IconsService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private clientsService: ClientsService
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadOrganizationUnits();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedIcon = this.config.data.selectedIcon;
    this.pageSelectedOrganizationUnit = this.config.data.selectedOrganizationUnit;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      organizationUnitId:  [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedIcon?.name,
        organizationUnitId: null
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedIcon?.organizationUnitId!);
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        } else {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.pageSelectedOrganizationUnit?.id!)!;
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        }
      }
    );
  }

  onIconSelected(icon: NewIcon): void {
    this.uploadedIcon = icon;
  }

  onIconUploaded(uploadedIcon: File): void {
    this.uploadedFile = uploadedIcon;
  }

  onSave(): void {
    let value = this.formGroup?.getRawValue();
    value = { ...value, fileName: this.uploadedIcon?.fileName, fileSize: this.uploadedIcon?.fileSize, organizationUnitId: value.organizationUnitId?.data.id };
    if(this.edit) {
      value.id = this.selectedIcon?.id;
      this.iconsService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('icon.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('icon.dialog.editError')});
          }
        }
      );
    } else {
      this.iconsService.uploadFile(this.uploadedFile!).subscribe(
        {
            next: () => {
              this.iconsService.create(value).subscribe(
                {
                  next: () => {
                    this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('icon.dialog.addSuccess')});
                    this.onCloseDialog(true);
                  },
                  error: () => {
                    this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('icon.dialog.addError')});
                  }
                }
              );
            },
            error: () => {
              this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('background.dialog.addError')});
            }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
