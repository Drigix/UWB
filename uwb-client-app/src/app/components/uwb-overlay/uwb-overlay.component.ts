import { Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'uwb-overlay',
  templateUrl: './uwb-overlay.component.html'
})

export class UwbOverlayComponent extends OverlayPanel {

  @ViewChild('op') overlay?: OverlayPanel;


  toogleOverlay(event: any): void {
    this.overlay?.toggle(event);
  }
}
