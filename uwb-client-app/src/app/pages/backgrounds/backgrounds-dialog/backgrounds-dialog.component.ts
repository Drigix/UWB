import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBackground, NewBackground } from '@entities/background/background.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { UploadEvent } from '@entities/uwb-file-upload/upload-event.model';
import { TranslateService } from '@ngx-translate/core';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ClientsService } from '@services/clients/clients.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-backgrounds-dialog',
  templateUrl: './backgrounds-dialog.component.html',
  styleUrls: ['./backgrounds-dialog.component.scss']
})
export class BackgroundsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  treeSelectItems: IClientUnit[] = [];
  edit = false;
  selectedBackground?: IBackground;
  uploadedBackground?: IBackground;
  uploadedFile?: File;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private backgroundsService: BackgroundsService,
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
    this.selectedBackground = this.config.data.selectedBackground;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      organizationUnitId: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedBackground?.name,
        organizationUnitId: null
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          const serachOrgUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedBackground?.organizationUnitId!);
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        }
      }
    );
  }

  onBackgroundSelected(selectedBackground: NewBackground): void {
    this.uploadedBackground = selectedBackground;
  }

  onBackgroundUploaded(uploadedBackground: File): void {
    this.uploadedFile = uploadedBackground;
    console.log(this.uploadedFile);
  }

  onSave(): void {
    let value = this.formGroup?.getRawValue();
    value = { ...value, fileName: this.uploadedBackground?.fileName, fileSize: this.uploadedBackground?.fileSize, organizationUnitId: value.organizationUnitId?.data.id, scale: 1.0 }
    if(this.edit) {
      value.id = this.selectedBackground?.id;
      this.backgroundsService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('background.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('background.dialog.editError')});
          }
        }
      );
    } else {
      this.backgroundsService.uploadFile(this.uploadedFile!).subscribe(
        {
            next: () => {
              this.backgroundsService.create(value).subscribe(
                {
                  next: () => {
                    this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('background.dialog.addSuccess')});
                    this.onCloseDialog(true);
                  },
                  error: () => {
                    this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('background.dialog.addError')});
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
