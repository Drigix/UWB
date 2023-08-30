import { Component, OnInit } from '@angular/core';
import { INotification } from '@entities/notification/notification.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '@services/notifications/notifications.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  notifications: INotification[] = [];
  selectedNotification?: INotification;
  selectedRangeDate?: Date[] = [];

  constructor(
    private columnService: ColumnService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getNotificationColumns();
  }

  loadNotifications(): void {
    this.notificationsService.findAll().subscribe(
      (res) => {
        this.notifications = res;
      }
    );
  }

  onNotificationSelect(notification?: INotification): void {
    this.selectedNotification = notification ?? undefined;
  }

  onDateChange(rangeDate: Date[]): void {
    this.selectedRangeDate = rangeDate;
  }

  checkIsAllValid(): boolean {
    // return this.selectedBackground! && this.selectedObject! && this.selectedRangeDate.length === 2;
    return true;
  }

  onLoadNotifications(): void {
    this.loadNotifications();
  }
}
