import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAnchor } from '@entities/anchor/anchor.model';
import { TranslateService } from '@ngx-translate/core';
import { AnchorsService } from '@services/anchors/anchors.service';
import { ToastService } from '@shared/toast/toast.service';

@Component({
  selector: 'uwb-anchors-dialog',
  templateUrl: './anchors-dialog.component.html'
})

export class AnchorsDialogComponent implements OnInit, OnChanges {

  @Input() edit = false;
  @Input() selectedAnchor?: IAnchor;
  @Input() selectedBackgroundId?: number;

  @Output() emitCloseDialog = new EventEmitter();
  formGroup?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private anchorsService: AnchorsService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.loadFormGroup();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selectedAnchor']) {
      this.formGroup?.patchValue({
        name: this.selectedAnchor?.name,
        x: this.selectedAnchor?.x,
        y: this.selectedAnchor?.y,
        z: this.selectedAnchor?.z,
        backgroundId: this.selectedBackgroundId
      });
    }
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      x: [{value: null, disabled: false}, [Validators.required]],
      y: [{value: null, disabled: false}, [Validators.required]],
      z: [{value: null, disabled: false}, [Validators.required]],
      backgroundId: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedAnchor?.name,
        x: this.selectedAnchor?.x,
        y: this.selectedAnchor?.y,
        z: this.selectedAnchor?.z,
        backgroundId: this.selectedAnchor?.backgroundId
      });
    }
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    if(this.edit) {
      value.id = this.selectedAnchor?.id;
      this.anchorsService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('anchor.dialog.editSuccess')});
            this.emitCloseDialog.emit(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('anchor.dialog.editError')});
          }
        }
      );
    } else {
      this.anchorsService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('anchor.dialog.addSuccess')});
            this.emitCloseDialog.emit(true);
          },
          error: (error: HttpErrorResponse) => {
            if(error.status === 409) {
              this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('anchor.dialog.idAlreadyExistsError')});
            } else {
              this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('anchor.dialog.addError')});
            }
          }
        }
      );
    }
  }

  onCloseDialog(): void {
    this.emitCloseDialog.emit(false);
  }
}
