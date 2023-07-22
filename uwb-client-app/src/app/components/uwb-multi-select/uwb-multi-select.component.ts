import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { noop } from 'rxjs';
@Component({
  selector: 'uwb-multi-select',
  templateUrl: './uwb-multi-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwbMultiSelectComponent),
      multi: true,
    },
  ],
})
export class UwbMultiSelectComponent<T extends { id: number }> implements AfterViewInit, ControlValueAccessor {
  @Input() items: any[] = [];
  @Input() placeholder!: string;
  @Input() optionLabel!: string;
  @Input() showClear = false;
  @Input() label = 'Wybierz opcje';
  @ViewChild(MultiSelect) multiSelect!: MultiSelect;
  itemValue!: string;
  itemLabel!: string;
  filterBy!: string;
  value!: T[];
  isDisabled = false;
  @Output() emitSelectedOption = new EventEmitter<any>();

  onModelChange: (_: T[]) => void = () => noop;
  onModelTouched: () => void = () => noop;

  ngAfterViewInit(): void {
    this.multiSelect.registerOnChange(this.onModelChange);
    this.multiSelect.registerOnTouched(this.onModelTouched);
  }

  writeValue(value: T[] | undefined): void {
    this.value = value?.length ? [...value] : [];
  }

  registerOnChange(fn: (_: T[]) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  emitAndUpdate(event: { value: T[] }): void {
    this.value = event.value;
    this.emitSelectedOption.emit(event.value[event.value.length - 1]);
  }

  sort(): void {
    const selectedIds = this.value.map((item: T) => item.id);
    const sortedItems = [...this.items].sort((a: T, b: T) => {
      const aValue = selectedIds.includes(a.id) ? -1 : 1;
      const bValue = selectedIds.includes(b.id) ? -1 : 1;
      return aValue - bValue;
    });
    this.items = sortedItems;
  }
}
