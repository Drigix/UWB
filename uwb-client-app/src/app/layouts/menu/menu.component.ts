import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from '@entities/menu/menu-item.model';
import { MenuService } from './menu.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UwbProfileComponent } from '@components/uwb-profile/uwb-profile.component';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '@shared/theme/theme.service';
import { Subscription } from 'rxjs';
import { Themes } from '../themes';
import { IUser } from '@entities/user/user.model';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'uwb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() account?: IUser;
  items: IMenuItem[] = [];
  filteredItems: IMenuItem[] = [];
  primaryTheme = true;
  version: string | null = null;
  isMenuVisible = true;
  filterText = '';
  themeSubscription?: Subscription;
  constructor(
    private menuService: MenuService,
    private dialogService: DialogService,
    private router: Router,
    private translateService: TranslateService,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.items = await this.menuService.getMenuItems();
    this.items = this.menuService.filterTabsByAuth(this.items, this.account?.roles!);
    const currentUrl = window.location.pathname.split('/')[1];
    const currentMenuItem = this.items.find( i => i.routerLink === currentUrl);
    this.filteredItems = this.items;
    this.primaryTheme = this.account?.theme === 'darkTheme' ? false : true;
    this.observeAppThemeChange();
    //this.navigateToStartPage();
  }

  toggleMenuVisibility(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  openProfileDialog(): void {
    const ref = this.dialogService.open(UwbProfileComponent, {
      header: this.translateService.instant('global.menu.profile'),
      width: '45%'
    });
    //ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  logout(): void {
    this.authenticationService.logout();
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
    this.themeService.switchTheme(this.primaryTheme ? 'primaryTheme' : 'darkTheme');
    this.primaryTheme = !this.primaryTheme;
  }

  observeAppThemeChange(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(themeName => {
      const html = document.getElementsByTagName('html')[0];
      Themes.themes.get(themeName)!.forEach((value, key) => {
        html.style.setProperty(key, value);
      });
    });
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
