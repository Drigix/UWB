import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUser } from '@entities/user/user.model';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '@services/users/users.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'uwb-profile',
  templateUrl: './uwb-profile.component.html',
  styleUrls: ['./uwb-profile.component.scss']
})
export class UwbProfileComponent implements OnInit {

  items: MenuItem[] = [];
  activeItem?: MenuItem;
  account?: IUser;

  constructor(
    private translateService: TranslateService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.loadAccount();
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

  loadAccount(): void {
    this.usersService.getAccount().subscribe(
      (res: HttpResponse<IUser>) => {
        this.account = res.body ?? undefined;
      }
    );
  }

  onActiveItemChange(event: MenuItem): void {
    this.activeItem = event;
  }

}
