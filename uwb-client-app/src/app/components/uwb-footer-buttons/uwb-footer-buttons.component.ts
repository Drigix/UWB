import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SizeScreenService } from '@shared/screen/size-screen.service';

@Component({
  selector: 'uwb-footer-buttons',
  templateUrl: './uwb-footer-buttons.component.html',
  styleUrls: ['./uwb-footer-buttons.component.scss']
})
export class UwbFooterButtonsComponent implements OnInit {

  @Input() showAddButton = true;
  @Input() showEditButton = true;
  @Input() showDeleteButton = true;
  @Input() disabledAddButton = false;
  @Input() disabledEditAndDeleteButton = false;
  @Input() styleClass = 'col-4 px-2';

  @Output() emitAddClick = new EventEmitter<boolean>();
  @Output() emitEditClick = new EventEmitter<boolean>();
  @Output() emitDeleteClick = new EventEmitter<boolean>();

  protected smallScreen = false;
  protected mobileScreen = false;

  constructor(private sizeScreenService: SizeScreenService) { }

  ngOnInit(): void {
    this.sizeScreenService.smallScreen$.subscribe((isSmall) => {
      this.smallScreen = isSmall;
    });
    this.sizeScreenService.mobileScreen$.subscribe((isMobile) => {
      this.mobileScreen = isMobile;
    });
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
