import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TreeTable } from 'primeng/treetable';

@Component({
  selector: 'uwb-tree-table',
  templateUrl: './uwb-tree-table.component.html'
})

export class UwbTreeTableComponent implements OnInit {
  @ViewChild('treeTable', { static: false }) treeTable?: TreeTable;

  @Input() values: any[] = [];
  @Input() columns: UniversalTableColumn[] = [];
  @Input() filterField = 'name';

  @Output() emitSelection = new EventEmitter<any>();

  selectedValue?: any;
  parentOfSelectedValue?: any;

  constructor() { }

  ngOnInit() { }

  treeTableFilter(event: any): void {
    this.treeTable?.filter(event.target.value, this.filterField, 'contains')
  }

  onNodeSelect(event: any) {
    this.selectedValue = event.node.data;
    this.parentOfSelectedValue = event.node.data.parentOrgUnit;
    this.emitSelection.emit({ selectedValue: this.selectedValue, parentOfSelectedValue: this.parentOfSelectedValue });
  }

  onNodeUnselect() {
    this.selectedValue = undefined;
    this.parentOfSelectedValue = undefined;
    this.emitSelection.emit({ selectedValue: this.selectedValue, parentOfSelectedValue: this.parentOfSelectedValue });
  }
}
