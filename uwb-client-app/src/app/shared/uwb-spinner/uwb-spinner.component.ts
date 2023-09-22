import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwb-spinner',
  templateUrl: './uwb-spinner.component.html',
  styleUrls: ['./uwb-spinner.component.scss']
})

export class UwbSpinnerComponent implements AfterViewInit {

  constructor(private cd: ChangeDetectorRef) {}

  imgVisible: number = 1;

  ngAfterViewInit(): void {
      setInterval(() => {
      this.imgVisible = this.getNextImageNumber(this.imgVisible);
      this.cd.detectChanges();
    }, 700);
  }

  getNextImageNumber(currentNumber: number): number {
    return currentNumber % 3 + 1;
  }
}
