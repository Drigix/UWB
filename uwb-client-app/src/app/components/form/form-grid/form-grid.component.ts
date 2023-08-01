import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uwb-form-grid',
  templateUrl: './form-grid.component.html'
})

export class FormGridComponent {

  @Input() formControlClass?: string;

  @HostBinding('class') classes = 'p-fluid formgrid grid';
}
