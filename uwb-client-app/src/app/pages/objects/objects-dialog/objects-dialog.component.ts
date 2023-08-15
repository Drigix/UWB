import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from '@entities/client/client.model';
import { IIcon } from '@entities/icon/icon.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { IObject } from '@entities/objects/object.model';
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
  dropdownClientItems: IClient[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private iconsService: IconsService,
    private clientsService: ClientsService,
    private objectTypesService: ObjectTypesService
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
        client: this.selectedObject?.client,
        type: this.selectedObject?.type,
        icon: this.selectedObject?.icon
      });
    }
  }

  loadClients(): void {
    this.clientsService.findAll().subscribe(
      (res) => {
        this.dropdownClientItems = res;
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
  }

  onCloseDialog(): void {
    console.log('close');
    this.ref.close();
  }
}
