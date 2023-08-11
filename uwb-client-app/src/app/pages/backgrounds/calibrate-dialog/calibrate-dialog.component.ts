import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBackground } from '@entities/background/background.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-calibrate-dialog',
  templateUrl: './calibrate-dialog.component.html',
  styleUrls: ['./calibrate-dialog.component.scss']
})

export class CalibrateDialogComponent implements OnInit {

  formGroup?: FormGroup;
  selectedBackground?: IBackground;
  edit = false;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
  }

  loadPageData(): void {
    this.selectedBackground = this.config.data.selectedBackground;
    this.edit = this.config.data.edit;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      realValue: [{value: null, disabled: false}, [Validators.required]],
    });
    if(this.edit) {
      this.formGroup.patchValue({
        realValue: this.selectedBackground?.name,
      });
    }
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
