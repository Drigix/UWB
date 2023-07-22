import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwb-spinner',
  templateUrl: './uwb-spinner.component.html',
  styleUrls: ['./uwb-spinner.component.scss']
})

export class UwbSpinnerComponent implements AfterViewInit {

  imgVisible: number = 1;

  ngAfterViewInit(): void {
      setInterval(() => {
      this.imgVisible = this.getNextImageNumber(this.imgVisible);
    }, 700);
  }

  getNextImageNumber(currentNumber: number): number {
    return currentNumber % 3 + 1;
  }
}
