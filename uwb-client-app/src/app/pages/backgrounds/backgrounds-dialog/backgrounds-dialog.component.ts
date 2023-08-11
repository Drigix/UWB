import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBackground } from '@entities/background/background.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-backgrounds-dialog',
  templateUrl: './backgrounds-dialog.component.html',
  styleUrls: ['./backgrounds-dialog.component.scss']
})
export class BackgroundsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  dropdownItems: any[] = [];
  edit = false;
  selectedBackground?: IBackground;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedBackground = this.config.data.selectedBackground;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      client: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedBackground?.name,
        client: null
      });
    }
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
  }

  onCloseDialog(): void {
    console.log('close');
    this.ref.close();
  }
}
