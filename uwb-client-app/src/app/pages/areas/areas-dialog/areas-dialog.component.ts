import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAreaType } from '@entities/area/area-type.model';
import { IArea } from '@entities/area/area.model';
import { IBackground } from '@entities/background/background.model';
import { AreaTypesService } from '@services/areas/area-types.service';
import { AreasService } from '@services/areas/areas.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-areas-dialog',
  templateUrl: './areas-dialog.component.html',
})
export class AreasDialogComponent implements OnInit {

  formGroup?: FormGroup;
  dropdownItems: IAreaType[] = [];
  edit = false;
  selectedBackground?: IBackground;
  selectedArea?: IArea;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private areasServices: AreasService,
    private areaTypesServices: AreaTypesService
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadAreaTypes();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedBackground = this.config.data.selectedBackground;
    this.selectedArea = this.config.data.selectedArea;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      areaType: [{value: null, disabled: false}, [Validators.required]],
      color: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  loadAreaTypes(): void {
    this.areaTypesServices.findAll().subscribe(
      (res) => {
        this.dropdownItems = res;
      }
    );
  }

  onAreaTypeChange(areaType: IAreaType): void {
    const colorValue = this.formGroup?.get('color');
    colorValue?.patchValue(areaType.color);
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    value.background = this.selectedBackground;
  }

  onCloseDialog(): void {
    this.ref.close();
  }
}
