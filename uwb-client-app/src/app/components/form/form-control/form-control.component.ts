import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControlName, Validators } from '@angular/forms';
import { FormGridComponent } from '../form-grid/form-grid.component';

@Component({
  selector: 'uwb-form-control',
  templateUrl: './form-control.component.html',
})
export class FormControlComponent implements OnInit, AfterContentInit {
  @Input() label?: string;
  @Input() labelParams?: Record<string, string | number>;
  @Input() info?: string;
  @Input() infoParams?: Record<string, string | number>;
  @Input() styleClass?: string;
  @Input() warning?: string;

  @ContentChild(FormControlName, { read: ElementRef }) formControl?: ElementRef<Element>;

  @ContentChild(FormControlName) formControlName?: FormControlName;

  @HostBinding('class') classes?: string;

  constructor(@Host() private formGridComponent: FormGridComponent, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.classes = this.styleClass ?? this.formGridComponent.formControlClass ?? 'col-12 md:col-6 lg:col-6';
  }

  ngAfterContentInit(): void {
    if (this.formControl?.nativeElement && !this.formControl.nativeElement.id && this.formControlName?.name) {
      this.renderer.setAttribute(this.formControl.nativeElement, 'id', this.formControlName.name.toString());
    }
  }

  get required(): boolean {
    if (this.formControlName && !this.formControlName.disabled) {
      return this.formControlName.control.hasValidator(Validators.required);
    }
    return false;
  }

}
