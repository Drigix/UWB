import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBackground } from '@entities/background/background.model';
import { TranslateService } from '@ngx-translate/core';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ToastService } from '@shared/toast/toast.service';
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
    private formBuilder: FormBuilder,
    private backgroundsService: BackgroundsService,
    private toastService: ToastService,
    private translateService: TranslateService
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
    this.backgroundsService.update(this.selectedBackground!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('background.dialog.editScaleSuccess')});
          this.onCloseDialog(true);
        },
        error: () => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('background.dialog.editScaleError')});
        }
      }
    );
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
