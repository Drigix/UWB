import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILanguage } from '@entities/global/language.model';
import { ITheme } from '@entities/global/theme.model';
import { IUpdateUser, IUser, UpdateUser } from '@entities/user/user.model';
import { UsersService } from '@services/users/users.service';
import { LanguagesService } from '@shared/language/languages.service';
import { ThemeService } from '@shared/theme/theme.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Themes } from 'src/app/layouts/themes';

@Component({
  selector: 'uwb-profile-settings',
  templateUrl: './uwb-profile-settings.component.html',
})
export class UwbProfileSettingsComponent implements OnInit {

  @Input() account?: IUser;
  formGroup!: FormGroup;
  dropdownLanguageItems: ILanguage[] = [];
  dropdownThemeItems: ITheme[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private languagesService: LanguagesService,
    private themeService: ThemeService,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadLanguages();
    this.loadThemes();
    this.loadFormGroup();
  }

  loadLanguages(): void {
    this.dropdownLanguageItems = this.languagesService.getLanguages();
  }

  loadThemes(): void {
    this.dropdownThemeItems = this.themeService.getThemes();
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      language: [{ value: null, disabled: false }, [Validators.required]],
      theme: [{ value: null, disabled: false }, [Validators.required]],
    });
    console.log(this.account);
    const language = this.account?.langKey ?? 'pl';
    const theme = this.account?.theme ?? 'primaryTheme';
    this.formGroup.patchValue({ language, theme });
  }

  onSave(): void {
    const value = this.formGroup.getRawValue();
    const account = { ...this.account };
    account.roles = undefined;
    const user: UpdateUser = { ...account };
    user.langKey = value.language;
    user.theme = value.theme;
    user.roleIds = this.account?.roles?.map(role => role.id!);
    this.usersService.update(user).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: 'Success', 'detail': 'Pomyślnie edytowano profil!'})
          this.changeTheme(user.theme!);
          this.onCloseDialog();
        },
        error: () => {
          this.toastService.showErrorToast({summary: 'Error', 'detail': 'Edycja nie powiodła się!'})
        }
      }
    );
  }

  changeTheme(userTheme: string): void {
    const html = document.getElementsByTagName('html')[0];
    Themes.themes.get(userTheme!)!.forEach((value, key) => {
      html.style.setProperty(key, value);
    });
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
