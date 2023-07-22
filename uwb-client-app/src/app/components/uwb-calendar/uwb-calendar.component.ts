import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarType } from '@entities/uwb-calendar/uwb-calendar-type.model';
import { Calendar, CalendarTypeView } from 'primeng/calendar';
import { noop } from 'rxjs';
import { format, parse, setDate, setHours, setMilliseconds, setMinutes, setMonth, setSeconds, setYear, startOfDay, startOfHour, startOfMinute, startOfMonth, startOfSecond, startOfWeek, startOfYear } from 'date-fns';

@Component({
  selector: 'uwb-calendar',
  templateUrl: './uwb-calendar.component.html',
  styleUrls: ['./uwb-calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UwbCalendarComponent),
      multi: true
    }
  ]
})
export class UwbCalendarComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input() type?: CalendarType;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() rawValue = false;
  @Input() touchUI = false;
  @Input() showIcon = true;
  @Input() timeOnly = false;
  @Input() showButtonBar = false;
  @Input() showTime = false;
  @Input() label = 'Data';
  @Output() modelChange = new EventEmitter();
  @ViewChild(Calendar) calendar!: Calendar;

  @Input()
  fixed?: {
    year?: number;
    month?: number;
    date?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  };

  dateFormat!: string;
  parseDateFormat!: string;

  view!: CalendarTypeView;
  showSeconds!: boolean;

  disabledDays!: number[];
  stepMinute!: number;

  value?: string | Date;
  date?: Date;
  lastEmitedValue?: string | Date;

  isDisabled = false;

  onModelChange: (_: string | Date | undefined) => void = () => noop;

  onModelTouched: () => void = () => noop;

  ngOnInit(): void {
    const type = this.type ?? 'minute';
    switch (type) {
      case 'year': {
        this.dateFormat = 'yy';
        this.parseDateFormat = 'yyyy';
        this.view = 'year';
        this.showTime = false;
        break;
      }
      case 'month': {
        this.dateFormat = 'yy-mm';
        this.parseDateFormat = 'yyyy-MM';
        this.view = 'month';
        this.showTime = false;
        break;
      }
      case 'week':
      case 'date': {
        this.dateFormat = 'yy-mm-dd';
        this.parseDateFormat = 'yyyy-MM-dd';
        this.view = 'date';
        this.showTime = false;
        break;
      }
      case 'timeOnly': {
        this.dateFormat = 'yy-mm-dd';
        this.parseDateFormat = this.rawValue ? 'yyyy-MM-dd HH:mm:ss' : 'HH:mm';
        this.view = 'date';
        this.timeOnly = true;
        break;
      }
      default: {
        this.dateFormat = 'yy-mm-dd';
        this.parseDateFormat = 'yyyy-MM-dd HH:mm:ss';
        this.view = 'date';
      }
    }
    this.showSeconds = type === 'second';
    this.disabledDays = type === 'week' ? [0, 2, 3, 4, 5, 6] : [];
    this.stepMinute = type === 'hour' ? 0 : 1;
  }

  ngAfterViewInit(): void {
    this.calendar.registerOnChange((date?: Date) => {
      date = this.correctDate(date);
      this.value = this.rawValue ? (date ? date : undefined) : (date ? format(date, this.parseDateFormat) : undefined);
      this.onModelChange(this.value);
    });
    this.calendar.registerOnTouched(this.onModelTouched);
  }

  onSelect(event?: Date): void {
    this.lastEmitedValue = this.value;
    this.modelChange.emit(event);
  }

  onClose(): void {
    const date = this.parseDate(this.value as string);
    const value = this.formatDate(date);
    if (this.lastEmitedValue !== value) {
      this.date = date;
      this.value = this.rawValue ? (date ? date : undefined) : value;
      this.lastEmitedValue = this.value;
      this.modelChange.emit(this.date);
    }
  }

  writeValue(value?: string): void {
    const changed = this.value !== value;
    if (changed) {
      this.date = this.parseDate(value);
      this.value = this.rawValue ? (this.date ? this.date : undefined) : this.formatDate(this.date);
      this.lastEmitedValue = this.value;

      // workaround - [(ngModel)]="date" powinno wystarczyć
      if (!this.date) {
        this.calendar.value = undefined;
        this.calendar.updateInputfield();
      }
    }
  }

  registerOnChange(fn: (_: string | Date | undefined) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private parseDate(value?: string | Date): Date | undefined {
    if(typeof value === 'string') {
      return this.correctDate(value.length ? parse(value, this.parseDateFormat, new Date()) : undefined) ?? this.correctDate(new Date(value));
    } else {
      return this.correctDate(new Date(value as Date));
    }
  }

  private formatDate(date?: Date): string | undefined {
    return date ? format(date, this.parseDateFormat) : undefined;
  }

  private correctDate(date?: Date): Date | undefined {
    if (date && !isNaN(date.getTime())) {
      switch (this.type ?? 'minute') {
        case 'year': {
          return this.correctWithFixed(startOfYear(date));
        }
        case 'month': {
          return this.correctWithFixed(startOfMonth(date));
        }
        case 'week': {
          return this.correctWithFixed(startOfWeek(date, { weekStartsOn: 1 }));
        }
        case 'date': {
          return this.correctWithFixed(startOfDay(date));
        }
        case 'hour': {
          return this.correctWithFixed(startOfHour(date));
        }
        case 'minute': {
          return this.correctWithFixed(startOfMinute(date));
        }
        case 'timeOnly': {
          return this.correctWithFixed(startOfMinute(date));
        }
        default: {
          return this.correctWithFixed(startOfSecond(date));
        }
      }
    }
    return undefined;
  }

  private correctWithFixed(date: Date): Date {
    let res = date;
    if (this.fixed?.year) {
      res = setYear(res, this.fixed.year);
    }
    if (this.fixed?.month) {
      res = setMonth(res, this.fixed.month);
    }
    if (this.fixed?.date) {
      res = setDate(res, this.fixed.date);
    }
    if (this.fixed?.hour) {
      res = setHours(res, this.fixed.hour);
    }
    if (this.fixed?.minute) {
      res = setMinutes(res, this.fixed.minute);
    }
    if (this.fixed?.second) {
      res = setSeconds(res, this.fixed.second);
    }
    if (this.fixed?.millisecond) {
      res = setMilliseconds(res, this.fixed.millisecond);
    }
    return res;
  }

}
