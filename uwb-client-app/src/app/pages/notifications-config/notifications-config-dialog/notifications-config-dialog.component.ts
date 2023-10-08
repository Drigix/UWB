import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorityService } from '@auth/authority.service';
import { IArea } from '@entities/area/area.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { INotificationConfig, INotificationConfigDTO } from '@entities/notification/notification-config.model';
import { NotificationTypeListConst } from '@entities/notification/notification-type.constans';
import { INotificationType } from '@entities/notification/notification-type.model';
import { TranslateService } from '@ngx-translate/core';
import { AreasService } from '@services/areas/areas.service';
import { ClientsService } from '@services/clients/clients.service';
import { NotificationTypesService } from '@services/notifications/notification-types.service';
import { NotificationsConfigService } from '@services/notifications/notifications-config.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-notifications-config-dialog',
  templateUrl: './notifications-config-dialog.component.html'
})

export class NotificationsConfigDialogComponent implements OnInit {

  formGroup?: FormGroup;
  edit = false;
  dropdownNotificationTypeItems: INotificationType[] = NotificationTypeListConst;
  dropdownAreaItems: IArea[] = [];
  selectedNotificationConfig?: INotificationConfig;
  treeSelectItems: IClientUnit[] = [];
  selectedOrganizationUnit?: IClientUnit;
  userOrganizationUnitId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private areasService: AreasService,
    private notificationsConfigService: NotificationsConfigService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private clientsService: ClientsService,
    private authorityService: AuthorityService
    ) { }

  ngOnInit() {
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loadPageData();
    this.loadFormGroup();
    this.loadOrganizationUnits();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedNotificationConfig = this.config.data.selectedNotificationConfig;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      title: [{value: null, disabled: false}, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      message: [{value: null, disabled: false}, [Validators.required, Validators.maxLength(300)]],
      notificationTypeId: [{value: null, disabled: false}, [Validators.required]],
      areaIds: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        title: this.selectedNotificationConfig?.title,
        message: this.selectedNotificationConfig?.message,
        notificationTypeId: this.selectedNotificationConfig?.type?.id,
        areaIds: this.selectedNotificationConfig?.areaIds
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          this.selectedOrganizationUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedNotificationConfig?.organizationUnitId!)!;
        } else {
          this.selectedOrganizationUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        }
        this.loadAreas(this.selectedOrganizationUnit.data.id!);
      }
    );
  }

  loadAreas(organizationUnitId: number): void {
    this.areasService.findAllByOrganizationUnit(organizationUnitId).subscribe(
      (res: HttpResponse<IArea[]>) => {
        this.dropdownAreaItems = res.body ?? [];
        if(this.dropdownAreaItems.length === 1) {
          this.formGroup?.get('areaIds')?.setValue([this.dropdownAreaItems[0].id]);
        }
      }
    );
  }

  onOrganizationUnitSelected(organizationUnit: IClient) {
    if(organizationUnit) {
      this.formGroup?.get('areaIds')?.setValue(undefined);
      this.loadAreas(organizationUnit.id!);
    }
  }

  returnAreaTextLenght(): number {
    const value = this.formGroup?.get('message')?.getRawValue();
    return value ? value.length : 0;
  }

  onSave(): void {
    const value: INotificationConfigDTO = this.formGroup?.getRawValue();
    if(this.edit) {
      value.id = this.selectedNotificationConfig?.id;
      this.notificationsConfigService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('notification.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('notification.dialog.editError')});
          }
        }
      );
    } else {
      this.notificationsConfigService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('notification.dialog.addSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('notification.dialog.addError')});
          }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
