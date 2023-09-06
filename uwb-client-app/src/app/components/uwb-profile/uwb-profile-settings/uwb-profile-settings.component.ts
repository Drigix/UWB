import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILanguage } from '@entities/global/language.model';
import { ITheme } from '@entities/global/theme.model';
import { LanguagesService } from '@shared/language/languages.service';
import { ThemeService } from '@shared/theme/theme.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-profile-settings',
  templateUrl: './uwb-profile-settings.component.html'
})

export class UwbProfileSettingsComponent implements OnInit {

  formGroup!: FormGroup;
  dropdownLanguageItems: ILanguage[] = [];
  dropdownThemeItems: ITheme[] = [];
  account?: any;

  constructor(private formBuilder: FormBuilder, private ref: DynamicDialogRef, private languagesService: LanguagesService, private themeService: ThemeService) { }

  ngOnInit() {
    this.loadAccount();
    this.loadLanguages();
    this.loadThemes();
    this.loadFormGroup();
  }

  loadAccount(): void {

  }

  loadLanguages(): void {
    this.dropdownLanguageItems = this.languagesService.getLanguages();
  }

  loadThemes(): void {
    this.dropdownThemeItems = this.themeService.getThemes();
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      language: [{value: null, disabled: false}, [Validators.required]],
      theme: [{value: null, disabled: false}, [Validators.required]]
    });
    const language = this.dropdownLanguageItems.find(l => l.langKey === (this.account?.langKey ?? 'pl'));
    const theme = this.dropdownThemeItems.find(l => l.themeKey === (this.account?.theme ?? 'light'));
    this.formGroup.patchValue({language, theme});
  }

  onSave(): void {

  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
