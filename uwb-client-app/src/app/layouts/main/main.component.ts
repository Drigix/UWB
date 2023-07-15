import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwb-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  firstLoad = false;

  constructor() { }

  ngOnInit() {
    this.firstLoad = true;
  }

  isAuthenticated(): boolean {
    return true;
  }
}
