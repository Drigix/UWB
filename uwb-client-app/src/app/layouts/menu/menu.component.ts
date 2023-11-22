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
import { SizeScreenService } from '@shared/screen/size-screen.service';

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

  isMenuHide = false;
  mobileScreen = false;
  handleMobileSreen = false;

  constructor(
    private menuService: MenuService,
    private dialogService: DialogService,
    private router: Router,
    private translateService: TranslateService,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService,
    private sizeScreenService: SizeScreenService
  ) {}

  async ngOnInit(): Promise<void> {
    this.items = await this.menuService.getMenuItems();
    this.items = this.menuService.filterTabsByAuth(this.items, this.account?.roles!);
    const currentUrl = window.location.pathname.split('/')[1];
    const currentMenuItem = this.items.find( i => i.routerLink === currentUrl);
    this.filteredItems = this.items;
    this.primaryTheme = this.account?.theme === 'darkTheme' ? false : true;
    this.setMobileMenu();
    this.observeAppThemeChange();
    //this.navigateToStartPage();
  }

  setMobileMenu(): void {
    if(this.sizeScreenService.checkIsMobile()) {
      this.mobileScreen = true;
      this.isMenuVisible = false;
      this.isMenuHide = true;
      // this.deviceMenuItems = this.menuItemsAvailableForUser.filter( item => item.showOnMobile === true);
      // this.searchedMenuItems = this.deviceMenuItems;
    } else {
      this.sizeScreenService.mobileScreen$.subscribe(mobileScreen => {
        this.mobileScreen = mobileScreen;
        if(this.mobileScreen && this.mobileScreen !== this.handleMobileSreen) {
          this.handleMobileSreen = true;
          // this.items = this.menuService.getMenuItems();
          // this.deviceMenuItems = this.menuItemsAvailableForUser.filter( item => item.showOnMobile === true);
          // this.searchedMenuItems = this.deviceMenuItems;
          this.isMenuVisible = false;
        } else if(!this.mobileScreen &&  this.mobileScreen !== this.handleMobileSreen) {
          this.isMenuHide = false;
          this.handleMobileSreen = false;
          // this.items = this.menuService.getMenuItems();
          // this.searchedMenuItems = this.menuItemsAvailableForUser;
          this.isMenuVisible = true;
        }
      });
    }
  }

  toggleMenuVisibility(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  openProfileDialog(): void {
    const ref = this.dialogService.open(UwbProfileComponent, {
      header: this.translateService.instant('global.menu.profile'),
      width: this.sizeScreenService.smallScreen ? '95%' : '40%'
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
