import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRole } from '@entities/auth/role.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IUser } from '@entities/user/user.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientUnitsService } from '@services/clients/client-units.service';
import { ClientsService } from '@services/clients/clients.service';
import { UsersService } from '@services/users/users.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoleTableConst } from 'src/app/auth/role-access.type';

@Component({
  selector: 'uwb-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  formGroup?: FormGroup;
  treeSelectItems: IClientUnit[] = [];
  dropdownItems: IRole[] = RoleTableConst;
  edit = false;
  selectedUser?: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private usersService: UsersService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private clientsUnitService: ClientUnitsService
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadOrganizationUnits();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedUser = this.config.data.selectedUser;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [{value: null, disabled: false}, [Validators.required]],
      lastName: [{value: null, disabled: false}, [Validators.required]],
      email: [{value: null, disabled: false}, [Validators.required]],
      password: [{value: null, disabled: false}, [Validators.required, this.passwordValidator]],
      confirmPassword: [{value: null, disabled: false}, [Validators.required, this.matchPassword.bind(this)]],
      organizationUnitId: [{value: null, disabled: false}, [Validators.required]],
      roleIds: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.removeControl('password');
      this.formGroup.removeControl('confirmPassword');
      this.formGroup.patchValue({
        firstName: this.selectedUser?.firstName,
        lastName: this.selectedUser?.lastName,
        email: this.selectedUser?.email,
        roleIds: this.selectedUser?.roles?.map( role => role.id)
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          const serachOrgUnit = this.clientsUnitService.findByClientId(this.treeSelectItems[0], this.selectedUser?.organizationUnitId!);
          this.formGroup?.get('organizationUnitId')?.setValue(serachOrgUnit);
        }
      }
    );
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;

    if (!value) {
      return { 'required': true };
    }

    // Regular expressions for password requirements
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);
    const hasMinLength = value.length >= 8;

    if (!(hasUppercase && hasNumber && hasSpecialCharacter && hasMinLength)) {
      return { 'passwordRequirements': true };
    }

    return null;
  }

  matchPassword(control: FormControl): { [s: string]: boolean } | null {
    if (this.formGroup && control.value !== this.formGroup.get('password')!.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    delete value.confirmPassword;
    value.organizationUnitId = value.organizationUnitId.data.id;
    if(this.edit) {
      value.id = this.selectedUser?.id;
      this.usersService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('user.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('user.dialog.editError')});
          }
        }
      );
    } else {
      this.usersService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('user.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('user.dialog.editError')});
          }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
