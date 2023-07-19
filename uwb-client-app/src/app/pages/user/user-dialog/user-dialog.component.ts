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
      date: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
