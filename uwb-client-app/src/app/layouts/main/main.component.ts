import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '@shared/theme/theme.service';
import { Themes } from '../themes';
import { Router } from '@angular/router';
import { UsersService } from '@services/users/users.service';
import { HttpResponse } from '@angular/common/http';
import { IUser } from '@entities/user/user.model';
import { AuthorityService } from 'src/app/auth/authority.service';

@Component({
  selector: 'uwb-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  firstLoad = false;
  account?: IUser;

  constructor(
    private usersService: UsersService,
    private authorityService: AuthorityService
  ) { }

  ngOnInit() {
    this.firstLoad = true;
    if(this.authorityService.isAuthenticated()) {
      this.authorityService.setAutoLogout();
      this.usersService.getAccount().subscribe(
        (res: HttpResponse<IUser>) => {
          this.account = res.body ?? undefined;
          this.authorityService.setUserRoles(this.account?.roles!);
          window.localStorage.setItem('user_theme', this.account?.theme!);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.setLastUsedTheme(); }, 200);
  }

  isAuthenticated(): boolean {
    return this.account?.id ? true : false;
  }

  private setLastUsedTheme(): void {
    const html = document.getElementsByTagName('html')[0];
    const userTheme = this.account?.theme ?? 'primaryTheme';
    Themes.themes.get(userTheme!)!.forEach((value, key) => {
      html.style.setProperty(key, value);
    });
  }
}
