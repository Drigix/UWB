import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UwbSingleSelectValue } from '@entities/uwb-single-select/uwb-single-select-value.model';
import { Dropdown } from 'primeng/dropdown';
import { noop } from 'rxjs';

@Component({
  selector: 'uwb-single-select',
  templateUrl: './uwb-single-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwbSingleSelectComponent),
      multi: true,
    },
  ],
})
export class UwbSingleSelectComponent<T> implements AfterViewInit, ControlValueAccessor {

  @Input() items!: T[];
  @Input() placeholder = 'global.choose';
  @Input() optionLabel!: string;
  @Input() panelStyleClass!: string;
  @Input() optionDisabled!: string;
  @Input() itemValue!: string;
  @Input() filterBy!: string;
  @Output() modelChange = new EventEmitter();
  @Output() itemChange = new EventEmitter();
  @Input() itemTemplate: TemplateRef<any> | null = null;
  @Input() selectedItemTemplate: TemplateRef<any> | null = null;
  @ViewChild(Dropdown, { static: true }) dropdown!: Dropdown;
  @Input() value?: T | number;
  @Input() isDisabled = false;
  @Input() styleClass?: string;
  @Input() label = 'Wybierz opcje';

  onModelChange: (_: UwbSingleSelectValue | undefined) => void = () => noop;
  onModelTouched: () => void = () => noop;

  ngAfterViewInit(): void {
    this.dropdown.registerOnChange(this.onModelChange);
    this.dropdown.registerOnTouched(this.onModelTouched);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: UwbSingleSelectValue | undefined) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  emitModelAndItemChange(event: { value: number | T | undefined }): void {
    this.modelChange.emit(event.value);
    this.emitItemChange(event);
  }

  emitItemChange(event: { value: number | T | undefined }): void {
    const selectedItem = event.value ? this.items.find((item: any) => item?.[this.itemValue] === event.value) : undefined;
    this.itemChange.emit(Object.assign({}, event, { item: selectedItem ?? null }));
  }
}
