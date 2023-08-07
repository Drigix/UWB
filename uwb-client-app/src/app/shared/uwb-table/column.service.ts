import { Injectable } from '@angular/core';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';

@Injectable({providedIn: 'root'})
export class ColumnService {

  private columns: UniversalTableColumn[] = [];

  constructor() { }

  getUserColumns(): UniversalTableColumn[] {
    this.columns = [{
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
    }];
    return this.columns;
  }

  getAreaColumns(): UniversalTableColumn[] {
    this.columns = [{
      field: 'name',
      label: 'Name',
      header: 'Name',
    }];
    return this.columns;
  }
}
