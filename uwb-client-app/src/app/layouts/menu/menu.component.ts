import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from '@entities/menu/menu-item.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'uwb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items: IMenuItem[] = [];
  filteredItems: IMenuItem[] = [];
  lighVersion = true;
  version: string | null = null;
  isMenuVisible = true;
  filterText = '';
  constructor(
    private menuService: MenuService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //this.loadAccount();
    this.items = this.menuService.getMenuItems();
    this.filteredItems = this.items;
    //this.navigateToStartPage();
  }

  toggleMenuVisibility(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  // loadAccount(): void {
  //   this.accountService.getAuthenticationState().subscribe(account => {
  //     if (account) {
  //       this.account = account;
  //     }
  //   });
  // }

  logout(): void {
    //this.loginService.logout();
    //this.router.navigate(['/login']);
  }

  logoClick(): void {
    let count = 0;
    count++;
    setTimeout(() => {
      count = 0;
    }, 4000);
    if (count === 5) {
      window.alert(`Wersja aplikacji: ${this.version ?? ''}`);
    }
  }

  switchTheme(): void {
    // let name: string;
    // const html = document.getElementsByTagName('html')[0];
    // const themeName = window.localStorage.getItem(this.account!.login + '_colorTheme');
    // if (themeName === 'darkTheme') {
    //   window.localStorage.setItem(this.account!.login + '_colorTheme', 'primaryTheme');
    //   name = 'primaryTheme';
    // } else {
    //   window.localStorage.setItem(this.account!.login + '_colorTheme', 'darkTheme');
    //   name = 'darkTheme';
    // }
    // Themes.themes.get(name)!.forEach((value, key) => {
    //   html.style.setProperty(key, value);
    // });
  }

  navigateToStartPage(): void {
    // const item = this.stateStorageService.getUrl() ? this.items.find(i => i.routerLink === this.stateStorageService.getUrl()) : null;
    // if (item) {
    //   this.router.navigate([item.routerLink]);
    //   this.menuService.setActive(item);
    // } else {
    //   this.router.navigate([this.items[0].routerLink]);
    //   this.menuService.setActive(this.items[0]);
    // }
  }

  filterMenuItems(filterText: string): void {
    this.filteredItems = this.items.filter(item => item.title!.toLowerCase().includes(filterText));
  }
}
