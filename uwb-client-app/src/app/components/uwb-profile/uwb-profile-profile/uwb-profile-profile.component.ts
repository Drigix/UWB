import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@entities/user/user.model';

@Component({
  selector: 'uwb-profile-profile',
  templateUrl: './uwb-profile-profile.component.html'
})

export class UwbProfileProfileComponent implements OnInit {

  @Input() account?: IUser;

  constructor() { }

  ngOnInit() { }
}
