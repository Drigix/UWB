import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  formGroup?: FormGroup;
  dropdownItems = [
    {
      id: 1,
      name: "Jednostka główna"
    },
    {
      id: 2,
      name: "Jednostka poboczna"
    }
  ];
  edit = false;
  selectedUser?: any;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedUser = this.config.data.selectedUser;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      surname: [{value: null, disabled: false}, [Validators.required]],
      date: [{value: null, disabled: false}, [Validators.required]],
      email: [{value: null, disabled: false}, [Validators.required]],
      password: [{value: null, disabled: false}, [Validators.required]],
      confirmPassword: [{value: null, disabled: false}, [Validators.required]],
      orgUnit: [{value: null, disabled: false}, [Validators.required]],
      orgUnits: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
