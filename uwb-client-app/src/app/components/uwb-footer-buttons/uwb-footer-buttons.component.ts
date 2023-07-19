import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'uwb-footer-buttons',
  templateUrl: './uwb-footer-buttons.component.html',
  styleUrls: ['./uwb-footer-buttons.component.scss']
})
export class UwbFooterButtonsComponent implements OnInit {

  @Input() showAddButton = true;
  @Input() showEditButton = true;
  @Input() showDeleteButton = true;

  @Output() emitAddClick = new EventEmitter<boolean>();
  @Output() emitEditClick = new EventEmitter<boolean>();
  @Output() emitDeleteClick = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onAddClick(): void {
    this.emitAddClick.emit(true);
  }

  onEditClick(): void {
    this.emitEditClick.emit(true);
  }

  onDeleteClick(): void {
    this.emitDeleteClick.emit(true);
  }
}
