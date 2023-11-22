import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from '@entities/client/client.model';
import { IUser } from '@entities/user/user.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientsService } from '@services/clients/clients.service';
import { UsersService } from '@services/users/users.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-profile-profile',
  templateUrl: './uwb-profile-profile.component.html'
})

export class UwbProfileProfileComponent implements OnInit, OnChanges {

  @Input() account?: IUser;
  formGroup!: FormGroup;
  organizationUnit?: IClient;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private clientsService: ClientsService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private usersService: UsersService
    ) { }

  ngOnInit(): void  {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['account']) {
        this.loadFormGroup();
        if(this.account) {
          this.loadAccountOrganizationUnit();
        }
      }
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      id: [{value: null, disabled: true}, [Validators.required]],
      firstName: [{value: null, disabled: false}, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: [{value: null, disabled: false}, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: [{value: null, disabled: true}, [Validators.required], Validators.minLength(6), Validators.maxLength(50)],
      organizationUnitId: [{value: null, disabled: true}, [Validators.required]],
      roleIds: [{value: null, disabled: false}, [Validators.required]]
    });
      this.formGroup.patchValue({
        id: this.account?.id,
        firstName: this.account?.firstName,
        lastName: this.account?.lastName,
        email: this.account?.email,
        roleIds: this.account?.roles?.map( role => role.id)
      });
  }

  loadAccountOrganizationUnit(): void {
    this.clientsService.findById(this.account?.organizationUnitId!).subscribe(
      {
        next: (res: HttpResponse<IClient>) => {
          this.organizationUnit = res.body ?? undefined;
          this.formGroup.get('organizationUnitId')?.setValue(this.organizationUnit?.name);
        },
        error: () => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('user.dialog.editError')});
        }
      }
    );
  }

  onSave(): void {
    this.formGroup.get('organizationUnitId')?.setValue(this.organizationUnit?.id);
    const value = this.formGroup?.getRawValue();
    this.usersService.update(value).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('user.dialog.editSuccess')});
          window.location.reload();
          this.onCloseDialog();
        },
        error: () => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('user.dialog.editError')});
        }
      }
    );
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
