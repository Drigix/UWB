import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { IObject } from '@entities/objects/object.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientsService } from '@services/clients/clients.service';
import { ObjectTypesService } from '@services/objects/object-types.service';
import { ObjectsService } from '@services/objects/objects.service';
import { ToastService } from '@shared/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-objects-dialog',
  templateUrl: './objects-dialog.component.html'
})

export class ObjectsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  edit = false;
  selectedObject?: IObject;
  dropdownObjectTypeItems: IObjectType[] = [];
  treeSelectItems: IClientUnit[] = [];
  selectedOrganizationUnit?: IClientUnit;
  pageSelectedOrganizationUnit?: IClient;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private objectsService: ObjectsService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private objectTypesService: ObjectTypesService
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadOrganizationUnits();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedObject = this.config.data.selectedObject;
    this.pageSelectedOrganizationUnit = this.config.data.selectedOrganizationUnit;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      secondName: [{value: null, disabled: false}, [Validators.required]],
      hexTagId: [{value: null, disabled: false}, [Validators.required]],
      uwbObjectTypeId: [{value: null, disabled: false}, [Validators.required]],
    });
    if(this.edit) {
      this.loadObjectTypes(this.selectedObject?.uwbObjectType?.organizationUnitId!);
      this.formGroup.patchValue({
        name: this.selectedObject?.name,
        secondName: this.selectedObject?.secondName,
        hexTagId: this.selectedObject?.hexTagId,
        uwbObjectTypeId: this.selectedObject?.uwbObjectType?.id,
      });
    }
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          this.selectedOrganizationUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedObject?.uwbObjectType?.organizationUnitId!)!;
        } else {
          this.selectedOrganizationUnit = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.pageSelectedOrganizationUnit?.id!)!;
          this.loadObjectTypes(this.selectedOrganizationUnit.data.id!);
        }
      }
    );
  }

  loadObjectTypes(organizationUnitId: number): void {
    this.objectTypesService.findAllByUserOrganizationUnit(organizationUnitId).subscribe(
      (res: HttpResponse<IObjectType[]>) => {
        this.dropdownObjectTypeItems = res.body ?? [];
        if(this.dropdownObjectTypeItems.length === 1) {
          this.formGroup?.get('uwbObjectTypeId')?.setValue(this.dropdownObjectTypeItems[0].id);
        }
      }
    );
  }

  onOrganizationUnitSelected(organizationUnit: IClient) {
    if(organizationUnit) {
      this.loadObjectTypes(organizationUnit.id!);
    }
  }

  onSave(): void {
    let value = this.formGroup?.getRawValue();
    value = {...value, hexTagId: value.hexTagId.toLowerCase()};
    if(this.edit) {
      value.id = this.selectedObject?.id;
      this.objectsService.update(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('object.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('object.dialog.editError')});
          }
        }
      );
    } else {
      this.objectsService.create(value).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('object.dialog.addSuccess')});
            this.onCloseDialog(true);
          },
          error: (error: HttpErrorResponse) => {
            if(error.status === 409) {
              this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('object.dialog.idAlreadyExistsError')});
            } else {
              this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('object.dialog.addError')});
            }
          }
        }
      );
    }
  }

  onCloseDialog(response?: any): void {
    this.ref.close(response);
  }
}
