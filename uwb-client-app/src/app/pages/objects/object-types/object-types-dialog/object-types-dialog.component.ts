import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { ClientUnitsService } from '@services/clients/client-units.service';
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
  treeSelectItems: IClientUnit[] = [];
  selectedClient?: IClientUnit;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private clientUnitsService: ClientUnitsService
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
    this.clientUnitsService.findAll().subscribe(
      (res) => {
        this.treeSelectItems = res;
        if(this.edit) {
          this.selectedClient = this.clientUnitsService.findByClientId(this.treeSelectItems[0], this.selectedObjectType?.client?.id!)!;
          this.formGroup?.get('client')?.patchValue(this.selectedClient);
        }
      }
    );
  }

  onClientSelected(event: any): void {
    console.log(event);
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
