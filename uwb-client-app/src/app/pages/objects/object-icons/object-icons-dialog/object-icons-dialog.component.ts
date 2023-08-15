import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from '@entities/client/client.model';
import { IIcon } from '@entities/icon/icon.model';
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
