import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from '@entities/client/client.model';
import { ClientsService } from '@services/clients/clients.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'uwb-clients-dialog',
  templateUrl: './clients-dialog.component.html',
  styleUrls: ['./clients-dialog.component.scss']
})
export class ClientsDialogComponent implements OnInit {

  formGroup?: FormGroup;
  dropdownItems: IClient[] = [];
  edit = false;
  selectedClient?: IClient;

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
    this.clientsService.findAll().subscribe(
      (res) => {
        this.dropdownItems = res;
        if(this.edit) {
          this.formGroup?.patchValue({
            orgUnit: this.dropdownItems.find( item => item.id === this.selectedClient?.parentOrgUnit)
          });
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
