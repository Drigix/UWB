import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IAnchor } from '@entities/anchor/anchor.model';

@Component({
  selector: 'uwb-anchors-dialog',
  templateUrl: './anchors-dialog.component.html'
})

export class AnchorsDialogComponent implements OnInit, OnChanges {

  @Input() edit = false;
  @Input() selectedAnchor?: IAnchor;

  @Output() emitCloseDialog = new EventEmitter();
  formGroup?: FormGroup;

  constructor(
    private formBuilder: FormBuilder
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
        z: this.selectedAnchor?.z
      });
    }
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      x: [{value: null, disabled: false}, [Validators.required]],
      y: [{value: null, disabled: false}, [Validators.required]],
      z: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedAnchor?.name,
        x: this.selectedAnchor?.x,
        y: this.selectedAnchor?.y,
        z: this.selectedAnchor?.z
      });
    }
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    this.emitCloseDialog.emit(true);
  }

  onCloseDialog(): void {
    this.emitCloseDialog.emit(false);
  }
}
