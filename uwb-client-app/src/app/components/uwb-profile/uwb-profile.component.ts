import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'uwb-profile',
  templateUrl: './uwb-profile.component.html',
  styleUrls: ['./uwb-profile.component.scss']
})
export class UwbProfileComponent implements OnInit {

  items: MenuItem[] = [];
  activeItem?: MenuItem;
  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        id: '1',
        label: this.translateService.instant('profile.menu.profile'),
        icon: 'pi pi-user-edit'
      },
      {
        id: '2',
        label: this.translateService.instant('profile.menu.password'),
        icon: 'pi pi-lock'
      },
      {
        id: '3',
        label: this.translateService.instant('profile.menu.settings'),
        icon: 'pi pi-cog'
      }
    ];
    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem): void {
    this.activeItem = event;
  }

}
