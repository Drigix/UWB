import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArea } from '@entities/area/area.model';
import { INotificationConfig, INotificationConfigDTO } from '@entities/notification/notification-config.model';
import { INotificationType } from '@entities/notification/notification-type.model';
import { AreasService } from '@services/areas/areas.service';
import { NotificationTypesService } from '@services/notifications/notification-types.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-notifications-config-dialog',
  templateUrl: './notifications-config-dialog.component.html'
})

export class NotificationsConfigDialogComponent implements OnInit {

  formGroup?: FormGroup;
  edit = false;
  dropdownNotificationTypeItems: INotificationType[] = [];
  dropdownAreaItems: IArea[] = [];
  selectedNotificationConfig?: INotificationConfig;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private notificationTypesService: NotificationTypesService,
    private areasService: AreasService
    ) { }

  ngOnInit() {
    this.loadNotificationTypes();
    this.loadAreas();
    this.loadPageData();
    this.loadFormGroup();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedNotificationConfig = this.config.data.selectedNotificationConfig;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      title: [{value: null, disabled: false}, [Validators.required]],
      message: [{value: null, disabled: false}, [Validators.required]],
      type: [{value: null, disabled: false}, [Validators.required]],
      areas: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        title: this.selectedNotificationConfig?.title,
        message: this.selectedNotificationConfig?.message,
        type: this.selectedNotificationConfig?.type?.id,
        areas: this.selectedNotificationConfig?.areas
      });
    }
  }

  loadNotificationTypes(): void {
    this.notificationTypesService.findAll().subscribe(
      (res) => {
        this.dropdownNotificationTypeItems = res;
      }
    );
  }

  loadAreas(): void {
    this.areasService.findAll().subscribe(
      (res: HttpResponse<IArea[]>) => {
        this.dropdownAreaItems = res.body ?? [];
      }
    );
  }

  onSave(): void {
    const value: INotificationConfigDTO = this.formGroup?.getRawValue();
    console.log(value);
  }

  onCloseDialog(): void {
    console.log('close');
    this.ref.close();
  }
}
