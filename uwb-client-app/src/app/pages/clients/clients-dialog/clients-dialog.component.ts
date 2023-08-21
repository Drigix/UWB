import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { ClientUnitsService } from '@services/clients/client-units.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-clients-dialog',
  templateUrl: './clients-dialog.component.html',
  styleUrls: ['./clients-dialog.component.scss']
})
export class ClientsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  treeSelectItems: IClientUnit[] = [];
  edit = false;
  selectedClient?: IClient;
  selectedParentClient?: IClientUnit;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientUnitsService: ClientUnitsService
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.loadFormGroup();
    this.loadClients();
  }

  loadPageData(): void {
    this.edit = this.config.data.edit;
    this.selectedClient = this.config.data.selectedClient;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      orgUnit: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedClient?.name,
        orgUnit: null
      });
    }
  }

  loadClients(): void {
    this.clientUnitsService.findAll().subscribe(
      (res) => {
        this.treeSelectItems = res;
        if(this.edit) {
          this.selectedParentClient = this.clientUnitsService.findByClientId(this.treeSelectItems[0], this.selectedClient?.parentOrgUnit!)!;
          this.formGroup?.get('orgUnit')?.patchValue(this.selectedParentClient);
        }
      }
    );
  }

  onSave(): void {
    const value = this.formGroup?.getRawValue();
  }

  onCloseDialog(): void {
    console.log('close');
    this.ref.close();
  }
}
