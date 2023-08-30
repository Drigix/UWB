import { Injectable } from '@angular/core';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class ColumnService {
  private columns: UniversalTableColumn[] = [];

  constructor(private translateService: TranslateService) {}

  getUserColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'Name',
        header: 'Name',
      },
      {
        field: 'surname',
        label: 'Surname',
        header: 'Surname',
      },
      {
        field: 'email',
        label: 'Email',
        header: 'Email',
      },
    ];
    return this.columns;
  }

  getAreaColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'Name',
        header: 'Name',
      },
    ];
    return this.columns;
  }

  getBackgroundColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('background.name'),
      },
      {
        field: 'client',
        label: 'client',
        header: this.translateService.instant('background.client'),
      },
    ];
    return this.columns;
  }

  getClientColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('client.clients'),
      }
    ];
    return this.columns;
  }

  getObjectColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('object.name'),
      },
      {
        field: 'lastName',
        label: 'lastName',
        header: this.translateService.instant('object.lastName'),
      },
      {
        field: 'hexTagId',
        label: 'hexTagId',
        header: this.translateService.instant('object.hexTagId'),
      },
      {
        field: 'icon',
        subField: 'path',
        label: 'path',
        header: this.translateService.instant('object.imgUrl'),
      },
      {
        field: 'type',
        subField: 'name',
        label: 'type',
        header: this.translateService.instant('object.type'),
      }
    ];
    return this.columns;
  }

  getObjectTypeColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('object.name'),
      }
    ];
    return this.columns;
  }

  getIconColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('icon.name'),
      },
      {
        field: 'path',
        label: 'path',
        header: this.translateService.instant('icon.icon'),
      }
    ];
    return this.columns;
  }

  getNotificationColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'title',
        label: 'title',
        header: this.translateService.instant('notification.title'),
      },
      {
        field: 'message',
        label: 'message',
        header: this.translateService.instant('notification.message'),
      },
      {
        field: 'date',
        label: 'date',
        header: this.translateService.instant('notification.date'),
        dateFormat: 'yyyy-MM-dd HH:mm'
      },
      {
        field: 'objectName',
        label: 'objectName',
        header: this.translateService.instant('notification.objectName'),
      }
    ];
    return this.columns;
  }

  getNotificationTypeColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'title',
        label: 'title',
        header: this.translateService.instant('notification.title'),
      },
      {
        field: 'message',
        label: 'message',
        header: this.translateService.instant('notification.message'),
      },
      {
        field: 'type',
        subField: 'name',
        label: 'date',
        header: this.translateService.instant('notification.type'),
      }
    ];
    return this.columns;
  }
}
