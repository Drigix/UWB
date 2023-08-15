import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from '@entities/client/client.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { ClientsService } from '@services/clients/clients.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-object-types-dialog',
  templateUrl: './object-types-dialog.component.html'
})

export class ObjectTypesDialogComponent implements OnInit {

  formGroup?: FormGroup;
  edit = false;
  selectedObjectType?: IObjectType;
  dropdownItems: IClient[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService
    ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadClients();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedObjectType = this.config.data.selectedObjectType;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      client: [{value: null, disabled: false}, [Validators.required]],
      adminOnly: [{value: false, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedObjectType?.name,
        client: this.selectedObjectType?.client,
        adminOnly: this.selectedObjectType?.adminOnly
      });
    }
  }

  loadClients(): void {
    this.clientsService.findAll().subscribe(
      (res) => {
        this.dropdownItems = res;
      }
    );
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
