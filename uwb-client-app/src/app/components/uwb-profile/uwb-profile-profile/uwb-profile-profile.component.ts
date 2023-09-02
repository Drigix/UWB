import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwb-profile-profile',
  templateUrl: './uwb-profile-profile.component.html'
})

export class UwbProfileProfileComponent implements OnInit {

  account = {name: 'Michał', surname: 'Ławinski', email: 'mlawinsk@gmailcom', orgUnit: 'Politechnika Śląska'};
  constructor() { }

  ngOnInit() { }
}
