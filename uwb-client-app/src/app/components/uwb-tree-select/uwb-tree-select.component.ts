import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { UwbTreeSelectValue } from '@entities/uwb-tree-select/uwb-tree-select-value.model';
import { TreeNode } from 'primeng/api';
import { TreeSelect } from 'primeng/treeselect';
import { noop } from 'rxjs';

@Component({
  selector: 'uwb-tree-select',
  templateUrl: './uwb-tree-select.component.html',
  styleUrls: ['./uwb-tree-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwbTreeSelectComponent),
      multi: true,
    },
  ],
})

export class UwbTreeSelectComponent<T> implements OnChanges, AfterViewInit, ControlValueAccessor {
  @ViewChild(TreeSelect, { static: true }) treeSelect!: TreeSelect;

  @Input() options: IClientUnit[] = [];
  @Input() filter = true;
  @Input() label = 'Wybierz opcje';
  @Input() optionLabel = 'name';
  @Input() treeSelectValue?: any;
  @Input() itemValue!: string;
  @Input() styleClass = '';
  @Input() selectionMode: 'multiple' | 'single' | 'checkbox' = 'single';

  @Output() modelChange = new EventEmitter();
  @Output() itemChange = new EventEmitter();

  onModelChange: (_: UwbTreeSelectValue | undefined) => void = () => noop;
  onModelTouched: () => void = () => noop;

  handleOptions: IClientUnit[] = [];
  filterText = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['options']) {
      this.handleOptions = this.options;
    }
  }

  ngAfterViewInit(): void {
    this.treeSelect.registerOnChange(this.onModelChange);
    this.treeSelect.registerOnTouched(this.onModelTouched);
  }

  customFilter(event: any): void {
    const query = this.filterText.toLowerCase();
    if(query === '') {
      this.options = this.handleOptions;
    } else {
      this.options = this.handleOptions;
      this.options = this.filterTree(this.options as IClientUnit[], query);
    }
  }

  filterTree(nodes: IClientUnit[], query: string): IClientUnit[] {
    const filteredNodes: IClientUnit[] = [];

    for (const node of nodes) {
      if (node?.data && node.data['name'].toLowerCase().includes(query) && !filteredNodes.find(fn => fn.data.id === node.data.id)) {
        filteredNodes.push(node);
      }

      if (node.children && node.children.length > 0) {
        const filteredChildren = this.filterTree(node.children, query);
        if (filteredChildren.length > 0 && !filteredNodes.find(fn => fn.data.id === node.data.id)) {
          const clonedNode = { ...node };
          clonedNode.children = filteredChildren;
          filteredNodes.push(clonedNode);
        }
      }
    }

    return filteredNodes;
  }

  writeValue(value: any): void {
    this.treeSelectValue = value;
  }

  registerOnChange(fn: (_: UwbTreeSelectValue | undefined) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  emitModelAndItemChange(event: { node: {data: number | T | undefined } }): void {
    this.modelChange.emit(event.node.data);
    this.emitItemChange({value: event.node.data});
  }

  emitItemChange(event: { value: number | T | undefined }): void {
    const selectedItem = event.value ? this.options.find((item: any) => item?.[this.itemValue] === event.value) : undefined;
    this.itemChange.emit(Object.assign({}, event, { item: selectedItem ?? null }));
  }
}
