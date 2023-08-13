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
  mapLineLength?: number = undefined;

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
      realValue: [{value: null, disabled: true}, [Validators.required]],
    });
    if(this.edit) {
      this.formGroup.patchValue({
        realValue: this.selectedBackground?.name,
      });
    }
  }

  onDrawLineStringLengthChange(length: number): void {
    this.mapLineLength = length;
    this.formGroup?.get('realValue')?.enable();
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    const scale = Math.floor((this.mapLineLength! / value.realValue) * 100) / 100;
    this.selectedBackground!.scale = scale;
    console.log(this.selectedBackground)
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
