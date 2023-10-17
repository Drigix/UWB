import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IArea } from '@entities/area/area.model';
import { INotification } from '@entities/notification/notification.model';
import { IObject } from '@entities/objects/object.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { AreasService } from '@services/areas/areas.service';
import { NotificationsService } from '@services/notifications/notifications.service';
import { ObjectsService } from '@services/objects/objects.service';
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
  handleNotifications: INotification[] = [];
  dropdownFilterObjectItems: IObject[] = [];
  dropdownFilterAreaItems: IArea[] = [];
  selectedNotification?: INotification;
  selectedRangeDate: Date[] = [];
  loading = false;

  constructor(
    private columnService: ColumnService,
    private notificationsService: NotificationsService,
    private objectsService: ObjectsService,
    private areasService: AreasService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getNotificationColumns();
    this.loadObjects();
    this.loadAreas();
  }

  loadObjects(): void {
    this.objectsService.findAll().subscribe(
      (res: HttpResponse<IObject[]>) => {
        this.dropdownFilterObjectItems = res.body ?? [];
      }
    );
  }

  loadAreas(): void {
    this.areasService.findAll().subscribe(
      (res: HttpResponse<IObject[]>) => {
        this.dropdownFilterAreaItems = res.body ?? [];
      }
    );
  }

  loadNotifications(): void {
    this.loading = true;
    const dateFrom = this.selectedRangeDate[0];
    const dateTo = this.selectedRangeDate[1];
    this.notificationsService.findAllByDates(dateFrom, dateTo).subscribe(
      {
        next: (res: HttpResponse<INotification[]>) => {
          this.notifications = res.body ?? [];
          this.handleNotifications = this.notifications;
          this.loading = false;
        },
        error: (err) => {
          this.notifications = [];
          this.loading = false;
        }
      }
    );
  }

  onNotificationSelect(notification?: INotification): void {
    this.selectedNotification = notification ?? undefined;
  }

  onDateChange(rangeDate: Date[]): void {
    this.selectedRangeDate = rangeDate;
  }

  onObjectFilterSelected(selectedObject: IObject): void {
    if(selectedObject) {
      this.notifications = this.handleNotifications.filter(n => n.objectFullName?.includes(selectedObject.fullName!));
    } else {
      this. notifications = this.handleNotifications;
    }
  }

  onAreaFilterSelected(selectedArea: IArea): void {
    if(selectedArea) {
      this.notifications = this.handleNotifications.filter(n => n.areaName?.includes(selectedArea.name!));
    } else {
      this. notifications = this.handleNotifications;
    }
  }

  checkIsAllValid(): boolean {
    return this.selectedRangeDate.length === 2 && this.selectedRangeDate[1] !== undefined;
  }

  onLoadNotifications(): void {
    this.loadNotifications();
  }
}
