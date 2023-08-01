import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  TemplateRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ContentChild,
  AfterViewInit,
} from '@angular/core';
import { PrimeIcons, SortEvent } from 'primeng/api';
import { Table, TableService } from 'primeng/table';
import { debounce } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { DomHandler } from 'primeng/dom';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import * as moment from 'moment';
import { SortOrder } from '@shared/uwb-table/table-sort-order';
import { TableSorter } from '@shared/uwb-table/table-sorter';

export function tableFactory<T>(wrapper: UwbTableComponent<T>): Table | undefined {
  return wrapper.table;
}

type DataType = 'DATE' | 'BOOLEAN' | 'ARRAY' | 'NULL' | 'UNKNOWN';
type FilterMode = 'single' | 'multiple' | 'none';
type SelectMode = 'single' | 'multiple' | 'checkbox' | '';

export enum Actions {
  EDIT,
  DELETE,
  APPROVE,
  REJECT,
}

export interface TableAction<T> {
  onClick: (value: T) => void;
  icon?: string;
  type?: Actions;
  tooltip?: string;
  disableTooltip?: boolean;
}

@Component({
  selector: 'uwb-table',
  templateUrl: './uwb-table.component.html',
  styleUrls: ['./uwb-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DomHandler,
    TableService,
    {
      provide: Table,
      useFactory: tableFactory,
      deps: [UwbTableComponent],
    },
  ],
})
export class UwbTableComponent<T> implements OnChanges, AfterViewInit {
  @ViewChild('table', { static: true }) table: Table | undefined;
  @Input() values?: T[] = [];
  @Input() columns: UniversalTableColumn[] = [];
  @ContentChild('captionTemplate', { static: false }) captionTemplate: TemplateRef<any> | null = null;
  @ContentChild('headerTemplate', { static: false }) headerTemplate: TemplateRef<any> | null = null;
  @ContentChild('bodyTemplate', { static: false }) bodyTemplate: TemplateRef<any> | null = null;
  @ContentChild('footerTemplate', { static: false }) footerTemplate: TemplateRef<any> | null = null;
  @ContentChild('rowExpansion', { static: false }) rowExpansion: TemplateRef<any> | null = null;
  @Input() sortableColumns = true;
  @Input() customCaption = false;
  @Input() customHeader = false;
  @Input() customBody = false;
  @Input() customFooter = false;
  @Input() reportFilter: boolean | null = false;
  @Input() showCaption = true;
  @Input() showHeader = true;
  @Input() showCalendar = false;
  @Input() showFooter = true;
  @Input() showTableName = false;
  @Input() tableName: string | null = null;
  @Input() rows = 100;
  @Input() rowHeight = 43;
  @Input() headerTitle: string | null = null;
  @Input() filterMode: FilterMode = 'single';
  @Input() selectMode: SelectMode = 'single';
  @Input() customSort: ((a: T, b: T) => number) | null = null;
  @Input() customFilter: ((array: T[], searchQuery: string, columnField?: string) => T[]) | null = null;
  @Input() draggableRows = false;
  @Input() reorderableColumns = false;
  @Input() draggable = false;
  @Input() sortField: string | null = null;
  @Input() refreshRate: number | null = null;
  @Input() nullHandlerText = '-'; // co się ma wyświetlać dla danych typu null / undefined
  @Input() actions: TableAction<T>[] = [];
  @Input() scrollable = true;
  @Input() scrollHeight = 'flex';
  @Input() lazy = true;
  @Input() virtualScroll = true;
  @Input() rowHover = true;
  @Input() resizableColumns = true;
  @Input() rowExpand = false;
  @Input() expandedRowKeys: { [s: number]: boolean } = {};
  @Input() dataKey: string | null = null;
  @Input() uniqueKey = '';
  @Output() selectionChange = new EventEmitter<any | any[]>();
  @Output() refresh = new EventEmitter<void>();
  @Output() rowExpanded = new EventEmitter<void>();
  @Output() rowCollapsed = new EventEmitter<void>();
  @Output() dragged = new EventEmitter<T>();
  @Input() loading = false;
  @Input() parseHTML = false;
  @Input()
  get selection(): any | any[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._selection;
  }
  set selection(selection: any | any[]) {
    this._selection = selection;
    this.selectionChange.emit(this._selection);
  }

  filteredValues: T[] = [];
  storagedData: T[] = [];
  lazyValues: T[] = [];
  searchText: string | null = '';
  totalRecords = 0;
  disableTooltip = true;
  sortOrder = SortOrder.ASC;
  sortEvent: SortEvent | null = null;
  defaultFormat = 'yyyy-MM-dd';
  IMG_URL = '';
  tableWidth = '';

  filterGlobal = debounce(
    (filterString: string, columnField?: string) => {
      this.searchText = filterString;
      let filteredData;
      if (this.customFilter) {
        filteredData = this.customFilter(this.storagedData, this.searchText, columnField);
      } else if (this.reportFilter) {
        filteredData = this.storagedData.filter(data => this.filterReportFunction(data, columnField));
      } else {
        filteredData = this.storagedData.filter(data => this.filterFunction(data, columnField));
      }
      this.values = filteredData;
      if (this._selection?.length > 0) {
        const updatedSelection = this._selection.filter((item: any) => this.values?.includes(item));
        this.selection = updatedSelection;
      }
      if (this.sortEvent !== null) {
        this.handleSort(this.sortEvent);
      }
      this.totalRecords = this.values.length;
      this.lazyValues = this.values;
      this.cd.detectChanges();
    },
    500,
    { trailing: true }
  );

  private _selection: any | any[];

  constructor(
    protected cd: ChangeDetectorRef,
    private translateService: TranslateService,
  ) {
  }

  ngAfterViewInit(): void {
    this.tableWidth = this.table?.el.nativeElement.offsetWidth;

    const sortField = sessionStorage.getItem(`${this.uniqueKey}-sortField`);
    const sortOrder = sessionStorage.getItem(`${this.uniqueKey}-sortOrder`);

    if (sortField && sortOrder && this.table) {
      this.table.sortField = sortField;
      this.table.sortOrder = Number(sortOrder);
      this.table.sortSingle();
   }

    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (changes?.['values']?.currentValue != null) {
      this.setInitialValues();
    }

    const sortField = sessionStorage.getItem(`${this.uniqueKey}-sortField`);
    const sortOrder = sessionStorage.getItem(`${this.uniqueKey}-sortOrder`);

    if (sortField && sortOrder) {
      this.handleSort({ field: sortField, order: Number(sortOrder) });
    }

    this.cd.detectChanges();
  }

  onRefresh(): void {
    this.refresh.emit();
  }

  onDragStart(rowData: T): void {
    this.dragged.emit(rowData);
  }

  onRowExpand(): void {
    this.rowExpanded.emit();
  }

  onRowCollapse(): void {
    this.rowCollapsed.emit();
  }

  getColspan(): number {
    let len = this.columns.length;
    if (this.selectMode === 'checkbox') {
      len += 2;
    }
    if (this.draggableRows) {
      len += 1;
    }
    if (this.actions.length > 0) {
      len += 1;
    }
    if (this.rowExpand) {
      len += 1;
    }
    return len;
  }

  getRowValue(rowData: any, col: UniversalTableColumn): any {
    const data = rowData[col.field];
    const value = col.subField && data[col.subField] ? data[col.subField] : data;
    if (value == null) {
      return this.nullHandlerText;
    }
    if (Array.isArray(data)) {
      return data.join(', ');
    }
    let formattedValue: string | null = null;
    if (value && (typeof value === 'string' || typeof value === 'number')) {
      if (col.prefix) {
        formattedValue = `${col.prefix} ${value}`;
      }
      if (col.suffix) {
        formattedValue = `${value} ${col.suffix}`;
      }
      if (col.secondField && typeof rowData[col.secondField] === 'string') {
        formattedValue = `${value} ${rowData[col.secondField] as string}`;
      }
      return formattedValue ?? value;
    }
    return value;
  }

  getDateFormat(col: UniversalTableColumn): string {
    return col.dateFormat ?? this.defaultFormat;
  }

  getActionIcon(action: TableAction<T>): string {
    if (action.type === Actions.DELETE) {
      return PrimeIcons.TRASH;
    } else if (action.type === Actions.EDIT) {
      return PrimeIcons.PENCIL;
    } else if (action.type === Actions.APPROVE) {
      return PrimeIcons.CHECK;
    } else if (action.type === Actions.REJECT) {
      return PrimeIcons.TIMES;
    }
    return action.icon ?? PrimeIcons.QUESTION;
  }

  getActionTooltip(action: TableAction<T>): string | undefined {
    if (action.type === Actions.DELETE) {
      const deleteText = this.translateService.instant('buttons.delete');
      if (typeof deleteText === 'string') {
        return deleteText;
      }
    } else if (action.type === Actions.EDIT) {
      const editText = this.translateService.instant('buttons.edit');
      if (typeof editText === 'string') {
        return editText;
      }
    }
    return action.tooltip;
  }

  getInstanceType(value: any): DataType {
    if (value == null) {
      return 'NULL';
    }
    if (Array.isArray(value)) {
      return 'ARRAY';
    }
    if (value instanceof Date || (moment(value, moment.ISO_8601, true).isValid() && value.toString().includes(':'))) {
      return 'DATE';
    }
    if (typeof value === 'boolean') {
      return 'BOOLEAN';
    }
    return 'UNKNOWN';
  }

  getTooltipForArray(array: unknown): string {
    if (this.isStringOrNumberArray(array)) {
      return array.join('\n');
    }
    return '';
  }

  enableTooltipIfNecessary(event: any): void {
    if (event.target.offsetWidth < event.target.scrollWidth) {
      this.disableTooltip = false;
    } else {
      this.disableTooltip = true;
    }
  }

  handleSort(event?: SortEvent, initialSort = false): void {
    let subField;
    if (event) {
      this.sortEvent = event;
      const column = this.columns.find(col => col.field === event.field);
      if (column?.subField) {
        subField = column.subField;
      }
    }
    let sortField = initialSort && this.sortField ? this.sortField : event?.field;
    if (this.customSort !== null && event) {
      this.handleCustomSort(event);
    } else if (this.values) {
      const sortOrder = event?.order;
      if (sortField && subField) {
        sortField = sortField + '.' + subField;
      }
      const numeric = typeof sortField === 'number';
      this.values = TableSorter.sort(this.values, sortField, sortOrder, numeric);
      this.lazyValues = this.values!;
    }
    if (initialSort && this.table && this.sortField) {
      this.table.sortField = this.sortField;
      this.table.sortOrder = 1;
      this.table.sortSingle();
    }

    if (this.uniqueKey.length > 0) {
      sessionStorage.setItem(`${this.uniqueKey}-sortField`, event!.field!);
      sessionStorage.setItem(`${this.uniqueKey}-sortOrder`, event!.order!.toString());
    }
  }

  decodeHtml(html: any): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  private handleCustomSort(event: SortEvent): void {
    this.sortEvent = event;
    const order = event.order;
    if (this.customSort !== null) {
      if (order === 1) {
        this.values?.sort(this.customSort);
      } else {
        this.values?.sort(this.customSort).reverse();
      }
    }
  }

  private filterFunction(data: any, columnField?: string): boolean {
    if (this.searchText != null && this.searchText.length > 0) {
      const searchStringArray = this.searchText.split(' ').filter(elem => elem.trim() !== '');
      let foundElements = 0;
      if (searchStringArray.length > 0) {
        for (const search of searchStringArray) {
          let occurrence = false;
          for (const col of this.columns) {
            if (columnField && col.field !== columnField) {
              continue;
            }
            let stringValue = String(data[col.field]);
            if (col.subField != null) {
              if (data[col.field] != null) {
                stringValue = String(data[col.field][col.subField]);
              }
            }
            if (data[col.field] != null) {
              if (stringValue.toLowerCase().includes(search.trim().toLowerCase())) {
                occurrence = true;
              }
            }
          }
          if (occurrence) {
            foundElements++;
          }
        }
      } else {
        return true;
      }
      return searchStringArray.length === foundElements;
    } else {
      return true;
    }
  }

  private filterReportFunction(data: any, columnField?: string): boolean {
    if (this.searchText && this.searchText.length > 0) {
      const searchStringArray = this.searchText.split(' ').filter(elem => elem.trim() !== '');
      let foundElements = 0;
      if (searchStringArray.length > 0) {
        for (const search of searchStringArray) {
          let occurrence = false;
          for (const col of this.columns) {
            if (columnField && col.field !== columnField) {
              continue;
            }
            if (col.lp !== undefined) {
              const stringValue = String(data.cells[col.lp].value);
              if (data.cells[col.lp].value) {
                if (stringValue.toLowerCase().includes(search.trim().toLowerCase())) {
                  occurrence = true;
                }
              }
            }
          }
          if (occurrence) {
            foundElements++;
          }
        }
      } else {
        return true;
      }
      return searchStringArray.length === foundElements;
    } else {
      return true;
    }
  }

  private isStringOrNumberArray(value: unknown): value is (string | number)[] {
    return Array.isArray(value) && value.every(item => typeof item === 'string' || typeof value === 'number');
  }

  private setInitialValues(): void {
    if (this.values && this.values.length > 0) {
      this.storagedData = this.values;
      this.totalRecords = this.values.length;
      if (this.parseHTML) {
        for (const obj of this.storagedData) {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              if(this.getInstanceType(obj[key]) !== 'BOOLEAN'){
                const fieldValue = obj[key];
                const processedValue = this.decodeHtml(fieldValue);
                obj[(key + 'Dec') as keyof typeof obj] = processedValue as typeof obj[keyof typeof obj];
              }
            }
          }
        }
      }
      if (this.searchText != null && this.searchText !== '') {
        this.filterGlobal(this.searchText);
      } else if (this.sortField) {
        this.handleSort(undefined, true);
      } else {
        this.lazyValues = this.values;
      }
    } else {
      this.storagedData = [];
      this.totalRecords = 0;
      this.lazyValues = [];
    }
  }
}
