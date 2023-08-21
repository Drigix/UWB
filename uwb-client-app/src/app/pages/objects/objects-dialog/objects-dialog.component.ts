import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IIcon } from '@entities/icon/icon.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { IObject } from '@entities/objects/object.model';
import { ClientUnitsService } from '@services/clients/client-units.service';
import { ClientsService } from '@services/clients/clients.service';
import { IconsService } from '@services/icon/icons.service';
import { ObjectTypesService } from '@services/objects/object-types.service';
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
  dropdownIconItems: IIcon[] = [];
  treeSelectClientItems: IClientUnit[] = [];
  selectedClient?: IClientUnit;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private iconsService: IconsService,
    private clientUnitsService: ClientUnitsService,
    private objectTypesService: ObjectTypesService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadClients();
    if(this.edit) {
      this.loadIcons();
      this.loadObjectTypes();
    }
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedObject = this.config.data.selectedObject;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      lastName: [{value: null, disabled: false}, [Validators.required]],
      hexTagId: [{value: null, disabled: false}, [Validators.required]],
      type: [{value: null, disabled: false}, [Validators.required]],
      icon: [{value: null, disabled: false}, [Validators.required]],
      client: [{value: null, disabled: false}, [Validators.required]],
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedObject?.name,
        lastName: this.selectedObject?.lastName,
        hexTagId: this.selectedObject?.hexTagId,
        type: this.selectedObject?.type,
        icon: this.selectedObject?.icon
      });
    }
  }

  loadClients(): void {
    this.clientUnitsService.findAll().subscribe(
      (res) => {
        this.treeSelectClientItems = res;
        if(this.edit) {
            this.selectedClient = this.clientUnitsService.findByClientId(this.treeSelectClientItems[0], this.selectedObject?.client?.id!)!;
            this.formGroup?.get('client')?.patchValue(this.selectedClient);
        }
      }
    );
  }

  loadObjectTypes(): void {
    this.objectTypesService.findAll().subscribe(
      (res) => {
        this.dropdownObjectTypeItems = res;
      }
    );
  }

  loadIcons(): void {
    this.iconsService.findAll().subscribe(
      (res) => {
        this.dropdownIconItems = res;
      }
    );
  }

  onClientSelected(client?: IClient): void {
    if(client) {
      this.loadObjectTypes();
      this.loadIcons();
    }
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
    console.log(value);
  }

  onCloseDialog(): void {
    console.log('close');
    this.ref.close();
  }
}
