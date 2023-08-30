import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'uwb-map-panel',
  templateUrl: './uwb-map-panel.component.html',
  styleUrls: ['./uwb-map-panel.component.scss']
})

export class UwbMapPanelComponent implements OnInit {

  @Input() disabledButtons = false;
  @Output() emitPlayClick = new EventEmitter();
  @Output() emitPauseClick = new EventEmitter();
  @Output() emitPreviousClick = new EventEmitter();
  @Output() emitNextClick = new EventEmitter();
  @Output() emitTimeToChangePoint = new EventEmitter();
  isPlay = false;
  timeToChangePoint = 2;
  minTimeToChangePoint = 0.1;
  maxTimeToChangePoint = 5;

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

  onTimeToChangePointChange(): void {
    if(this.timeToChangePoint === undefined || this.timeToChangePoint === null) {
      this.timeToChangePoint = 2;
    }
    this.emitTimeToChangePoint.emit(this.timeToChangePoint);
  }
}
