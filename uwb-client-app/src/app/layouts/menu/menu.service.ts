import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
      await this.createMenuItem('pi pi-users', 'global.menu.pages.users', 'user', []),
      await this.createMenuItem('pi pi-map-marker', 'global.menu.pages.localizations', 'localizations', []),
      await this.createMenuItem('fa fa-archive', 'global.menu.pages.localizationsArchive', 'localizations-archive', []),
      await this.createMenuItem('fa fa-object-group', 'global.menu.pages.areas', 'areas', []),
      await this.createMenuItem('fa fa-photo', 'global.menu.pages.backgrounds', 'backgrounds', []),
      await this.createMenuItem('fa fa-handshake-o', 'global.menu.pages.clients', 'clients', []),
      await this.createMenuItem('fa fa-bullseye', 'global.menu.pages.objects', 'objects', []),
      await this.createMenuItem('fa fa-anchor', 'global.menu.pages.anchors', 'anchors', []),
      await this.createMenuItem('pi pi-map', 'global.menu.pages.occurrence-map', 'occurrence-map', []),
      await this.createMenuItem('fa fa-envelope', 'global.menu.pages.notifications', 'notifications', []),
      await this.createMenuItem('fa fa-wrench', 'global.menu.pages.notificationsConfig', 'notifications-config', [])

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
