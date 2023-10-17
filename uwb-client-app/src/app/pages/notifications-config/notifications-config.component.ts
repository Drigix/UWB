import { Component, OnInit } from '@angular/core';
import { INotificationConfig } from '@entities/notification/notification-config.model';
import { INotification } from '@entities/notification/notification.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationsConfigDialogComponent } from './notifications-config-dialog/notifications-config-dialog.component';
import { NotificationsConfigService } from '@services/notifications/notifications-config.service';
import { HttpResponse } from '@angular/common/http';
import { ToastService } from '@shared/toast/toast.service';
import { NotificationTypeListConst } from '@entities/notification/notification-type.constans';
import { SizeScreenService } from '@shared/screen/size-screen.service';
import { ClientsService } from '@services/clients/clients.service';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { AuthorityService } from '@auth/authority.service';

@Component({
  selector: 'app-notifications-config',
  templateUrl: './notifications-config.component.html',
  styleUrls: ['./notifications-config.component.scss']
})
export class NotificationsConfigComponent implements OnInit {

  userOrganizationUnitId?: number;
  treeSelectItems: IClientUnit[] = [];
  columns: UniversalTableColumn[] = [];
  notifications: INotificationConfig[] = [];
  selectedNotificationConfig?: INotificationConfig;
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  handleSelectedOrganizationUnit?: IClient;

  constructor(
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private notificationsConfigService: NotificationsConfigService,
    private toastService: ToastService,
    private sizeScreenService: SizeScreenService,
    private clientsService: ClientsService,
    private authorityService: AuthorityService
  ) { }

  ngOnInit() {
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.columns = this.columnService.getNotificationTypeColumns();
    this.loadOrganizationUnits();
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        this.selectedOrganizationUnit = this.treeSelectItemSelected.data;
        this.handleSelectedOrganizationUnit = this.treeSelectItemSelected.data;
        this.loadNotificationsConfig();
      }
    );
  }

  loadNotificationsConfig(): void {
    this.notificationsConfigService.findAllByOrganizationUnit(this.selectedOrganizationUnit?.id! ?? this.userOrganizationUnitId).subscribe(
      (res: HttpResponse<INotificationConfig[]>) => {
        this.notifications = res.body ?? [];
        this.notifications.forEach(n => {
          n.type = NotificationTypeListConst.find(nt => nt.id === n.notificationTypeId);
        });
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.handleSelectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedNotificationConfig = undefined;
      this.loadNotificationsConfig();
    }
  }

  onNotificationSelect(notification?: INotification): void {
    this.selectedNotificationConfig = notification ?? undefined;
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(NotificationsConfigDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedNotificationConfig: this.selectedNotificationConfig,
        selectedOrganizationUnit: this.selectedOrganizationUnit
      },
      width: this.sizeScreenService.smallScreen ? '100%' : '40%'
    });
    ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  openDeleteDialog(): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog() : null;
    });
  }

  handleDialogResponse(response: any) {
    if(response) {
      this.selectedNotificationConfig = undefined;
      this.loadNotificationsConfig();
    }
  }

  handleDeleteDialog(): void {
    this.notificationsConfigService.delete(this.selectedNotificationConfig?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('notification.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('notification.dialog.deleteError')});
        }
      }
    );
  }

}
