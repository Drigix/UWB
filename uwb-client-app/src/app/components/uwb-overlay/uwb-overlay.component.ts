import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'uwb-overlay',
  templateUrl: './uwb-overlay.component.html'
})

export class UwbOverlayComponent implements OnInit {

  @ViewChild('op') overlay?: OverlayPanel;

  constructor() { }

  ngOnInit() { }

  toogleOverlay(event: any): void {
    this.overlay?.toggle(event);
  }
}
