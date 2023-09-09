import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '@entities/auth/login.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@shared/toast/toast.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { AuthorityService } from 'src/app/auth/authority.service';

@Component({
  selector: 'uwb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup?: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private authorityService: AuthorityService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadFormGroup();
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      email: [{ value: null, disabled: false }, [Validators.required]],
      password: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  login(): void {
    const value: ILogin = this.formGroup?.getRawValue();
    this.authenticationService.login(value).subscribe({
      next: (res) => {
        const token = res.body;
        this.authorityService.setAccessToken(token!);
        window.location.reload();
      },
      error: (err) => {
        this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('login.loginError')});
      },
    });
  }
}
