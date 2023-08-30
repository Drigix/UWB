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

@Component({
  selector: 'app-notifications-config',
  templateUrl: './notifications-config.component.html',
  styleUrls: ['./notifications-config.component.scss']
})
export class NotificationsConfigComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  notifications: INotificationConfig[] = [];
  selectedNotificationConfig?: INotificationConfig;

  constructor(
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private notificationsConfigService: NotificationsConfigService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getNotificationTypeColumns();
    this.loadNotificationsConfig();
  }

  loadNotificationsConfig(): void {
    this.notificationsConfigService.findAll().subscribe(
      (res) => {
        this.notifications = res;
      }
    );
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
      }
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
    console.log('DELETE');
  }

}
