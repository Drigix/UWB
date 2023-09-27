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
        field: 'firstName',
        label: 'firstName',
        header: this.translateService.instant('user.firstName')
      },
      {
        field: 'lastName',
        label: 'lastName',
        header: this.translateService.instant('user.lastName')
      },
      {
        field: 'email',
        label: 'email',
        header: this.translateService.instant('user.email')
      },
    ];
    return this.columns;
  }

  getAreaColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('area.name')
      },
      {
        field: 'areaType',
        subField: 'name',
        label: 'areaType',
        header: this.translateService.instant('area.areaType')
      },
      {
        field: 'color',
        label: 'color',
        style: {'width': '20%'},
        header: this.translateService.instant('area.color')
      },
    ];
    return this.columns;
  }

  getAreaTypeColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('areaType.name')
      },
      {
        field: 'color',
        label: 'color',
        header: this.translateService.instant('areaType.color')
      }
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
        field: 'scale',
        label: 'scale',
        header: this.translateService.instant('background.scale'),
      },
      {
        field: 'fullPath',
        label: 'fullPath',
        header: this.translateService.instant('background.image'),
      }
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
        field: 'secondName',
        label: 'secondName',
        header: this.translateService.instant('object.secondName'),
      },
      {
        field: 'hexTagId',
        label: 'hexTagId',
        header: this.translateService.instant('object.hexTagId'),
      },
      // {
      //   field: 'icon',
      //   subField: 'path',
      //   label: 'path',
      //   header: this.translateService.instant('object.imgUrl'),
      // },
      {
        field: 'uwbObjectType',
        subField: 'name',
        label: 'uwbObjectType',
        header: this.translateService.instant('object.uwbObjectType'),
      }
    ];
    return this.columns;
  }

  getObjectTypeColumns(): UniversalTableColumn[] {
    this.columns = [
      {
        field: 'name',
        label: 'name',
        header: this.translateService.instant('objectType.name'),
      },
      {
        field: 'uwbObjectIcon',
        subField: 'fullPath',
        label: 'uwbObjectIcon',
        header: this.translateService.instant('objectType.icon'),
      },
      {
        field: 'adminOnly',
        label: 'adminOnly',
        header: this.translateService.instant('objectType.adminOnly'),
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
        field: 'fullPath',
        label: 'fullPath',
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
