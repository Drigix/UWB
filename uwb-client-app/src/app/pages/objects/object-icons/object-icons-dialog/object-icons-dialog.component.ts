import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IIcon } from '@entities/icon/icon.model';
import { ClientUnitsService } from '@services/clients/client-units.service';
import { ClientsService } from '@services/clients/clients.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-object-icons-dialog',
  templateUrl: './object-icons-dialog.component.html'
})

export class ObjectIconsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  edit = false;
  selectedIcon?: IIcon;
  treeSelectItems: IClientUnit[] = [];
  selectedClient?: IClientUnit;

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
    this.selectedIcon = this.config.data.selectedIcon;
  }

  loadFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      name: [{value: null, disabled: false}, [Validators.required]],
      client: [{value: null, disabled: false}, [Validators.required]]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedIcon?.name,
        client: this.selectedIcon?.client
      });
    }
  }

  loadClients(): void {
    this.clientUnitsService.findAll().subscribe(
      (res) => {
        this.treeSelectItems = res;
        if(this.edit) {
          this.selectedClient = this.clientUnitsService.findByClientId(this.treeSelectItems[0], this.selectedIcon?.client?.id!)!;
          this.formGroup?.get('client')?.patchValue(this.selectedClient);
        }
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
