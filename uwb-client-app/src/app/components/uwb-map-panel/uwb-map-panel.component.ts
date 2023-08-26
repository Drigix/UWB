import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'uwb-map-panel',
  templateUrl: './uwb-map-panel.component.html',
  styleUrls: ['./uwb-map-panel.component.scss']
})

export class UwbMapPanelComponent implements OnInit {

  isPlay = false;
  @Output() emitPlayClick = new EventEmitter();
  @Output() emitPauseClick = new EventEmitter();
  @Output() emitPreviousClick = new EventEmitter();
  @Output() emitNextClick = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onPlayClick(): void {
    this.isPlay = true;
    this.emitPlayClick.emit();
  }

  onPauseClick(): void {
    this.isPlay = false;
    this.emitPauseClick.emit();
  }

  onPreviousClick(): void {
    this.emitPreviousClick.emit();
  }

  onNextClick(): void {
    this.emitNextClick.emit();
  }
}
