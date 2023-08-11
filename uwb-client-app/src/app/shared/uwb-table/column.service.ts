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
}
