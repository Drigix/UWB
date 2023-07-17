import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from 'primeng/calendar';
import { noop } from 'rxjs';

@Component({
  selector: 'uwb-calendar',
  templateUrl: './uwb-calendar.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwbCalendarComponent),
      multi: true
    }
  ]
})
export class UwbCalendarComponent extends Calendar implements OnInit, ControlValueAccessor {

  @ViewChild(Calendar) calendar?: Calendar;

  // @Input() rawValue = false;

  @Output() modelChange = new EventEmitter();

  // override onModelChange: (_: string | Date | undefined) => void = () => noop;
  // override onModelTouched: () => void = () => noop;

  //override value?: string | Date;
  date?: Date;
  //lastEmitedValue?: string | Date;

  override ngOnInit() { }

  // override writeValue(value?: string): void {
  //   const changed = this.value!== value;
  //   if(changed) {
  //     this.date = new Date(value!);
  //     this.value = this.rawValue ? (this.date ? this.date : undefined) : this.date;
  //     this.lastEmitedValue = this.value;
  //     if(!this.date) {
  //       this.calendar!.value = undefined;
  //       this.calendar!.updateInputfield();
  //     }
  //   }
  // }

  // override registerOnChange(fn: (_: string | Date | undefined) => void): void {
  //     this.onModelChange = fn;
  // }

  // override registerOnTouched(fn: () => void): void {
  //     this.onModelTouched = fn;
  // }

  override onDateSelect(date: Date): void {
    this.modelChange.emit(date);
  }
}
