import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_ACCESS, LOGGED_USER_ACCESS } from '@auth/role-access.type';
import { IRole } from '@entities/auth/role.model';
import { IMenuItem } from '@entities/menu/menu-item.model';
import { TranslateService } from '@ngx-translate/core';
import { UwbTranslateService } from '@shared/uwb-translate/uwb-translate.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  lastSelected!: IMenuItem | null;

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private uwbTranslateService: UwbTranslateService
    ) { }

  async getMenuItems(): Promise<IMenuItem[]> {
    const items: IMenuItem[] = [
      await this.createMenuItem('pi pi-users', 'global.menu.pages.users', 'user', ADMIN_ACCESS),
      await this.createMenuItem('pi pi-map-marker', 'global.menu.pages.localizations', 'localizations', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-archive', 'global.menu.pages.localizationsArchive', 'localizations-archive', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-object-group', 'global.menu.pages.areas', 'areas', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-photo', 'global.menu.pages.backgrounds', 'backgrounds', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-handshake-o', 'global.menu.pages.clients', 'clients', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-bullseye', 'global.menu.pages.objects', 'objects', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-anchor', 'global.menu.pages.anchors', 'anchors', LOGGED_USER_ACCESS),
      await this.createMenuItem('pi pi-map', 'global.menu.pages.occurrence-map', 'occurrence-map', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-envelope', 'global.menu.pages.notifications', 'notifications', LOGGED_USER_ACCESS),
      await this.createMenuItem('fa fa-wrench', 'global.menu.pages.notificationsConfig', 'notifications-config', LOGGED_USER_ACCESS)

    ];
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

  private async createMenuItem(icon: string | null, label: string, routerLink: string, auth: string[], additionalOptions?: any): Promise<IMenuItem> {
    const menuItem = {
      icon: icon ? icon : '',
      label: await this.uwbTranslateService.get(label),
      routerLink,
      title: this.translateService.instant(label),
      auth,
      command: (event: any) => this.setActive(event.item),
    };
    Object.assign(menuItem, additionalOptions);
    return menuItem;
  }

  filterTabsByAuth(items: IMenuItem[], roles: IRole[]): IMenuItem[] {
    const outItems: IMenuItem[] = [];
    const userRoles = roles.map(r => r.name);
    items.forEach((item) => {
      if (item.auth?.some( a => userRoles.includes(a))) {
        outItems.push(item);
      }
    });
    return outItems;
  }
}
