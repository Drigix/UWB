import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from '@entities/menu/menu-item.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class MenuService {
  lastSelected!: IMenuItem | null;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    ) { }

  getMenuItems(): IMenuItem[] {
    const items: IMenuItem[] = [
      this.createMenuItem('pi pi-fw pi-plus', 'global.menu.user', 'user', []),
    ];
    //items = this.filterTabsByAuth(items);
    return items;
  }

  setActive(item: IMenuItem): void {
    if (this.lastSelected) {
      this.lastSelected.styleClass = '';
    }
    this.lastSelected = item;
    item.styleClass = 'active-page';
    //this.stateStorageService.storeUrl(item.routerLink);
  }

  createMenuGroup(icon: string | null, label: string, auth: string[], children: IMenuItem[], additionalOptions?: any): IMenuItem {
    const menuGroup = {
      icon: icon ? icon : '',
      label,
      items: children,
      title: this.translateService.instant(label),
      auth,
    };
    Object.assign(menuGroup, additionalOptions);
    return menuGroup;
  }

  private createMenuItem(icon: string | null, label: string, routerLink: string, auth: string[], additionalOptions?: any): IMenuItem {
    const menuItem = {
      icon: icon ? icon : '',
      label: this.translateService.instant(label),
      routerLink,
      title: this.translateService.instant(label),
      auth,
      command: (event: any) => this.setActive(event.item),
    };
    Object.assign(menuItem, additionalOptions);
    return menuItem;
  }

  // private filterTabsByAuth(items: IMenuItem[]): IMenuItem[] {
  //   const outItems: IMenuItem[] = [];

  //   items.forEach((item) => {
  //     if (this.accountService.hasAnyAuthority(item.auth)) {
  //       outItems.push(item);
  //     }
  //   });
  //   return this.accountService.isSupervisor() ? items : outItems;
  // }
}
