import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'uwb-dialog',
  templateUrl: './uwb-dialog.component.html',
})
export class UwbDialogComponent {

  @Input() visible = true;
  @Input() header = '';
  @Input() width = '50vh';

  @Output() emitClose = new EventEmitter();

  onHide(): void {
    this.emitClose.emit();
  }
}
