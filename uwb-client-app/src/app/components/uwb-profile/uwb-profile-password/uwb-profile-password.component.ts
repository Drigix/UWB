import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-profile-password',
  templateUrl: './uwb-profile-password.component.html'
})

export class UwbProfilePasswordComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.loadFormGroup();
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      oldPassword: [{value: null, disabled: false}, [Validators.required]],
      password: [{value: null, disabled: false}, [Validators.required, this.passwordValidator]],
      confirmPassword: [{value: null, disabled: false}, [Validators.required, this.matchPassword.bind(this)]]
    });
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

  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
