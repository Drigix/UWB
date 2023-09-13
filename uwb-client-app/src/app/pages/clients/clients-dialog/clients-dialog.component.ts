import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient, NewClient } from '@entities/client/client.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientUnitsService } from '@services/clients/client-units.service';
import { ClientsService } from '@services/clients/clients.service';
import { ToastService } from '@shared/toast/toast.service';
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
  selectedParentClient?: IClient;

  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private clientsService: ClientsService,
    private clientUnitsService: ClientUnitsService,
    private toastService: ToastService,
    private translateService: TranslateService
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
      parentOrganizationUnitId: [{value: null, disabled: false}, [Validators.required]],
      treePath: [{value: null, disabled: false}]
    });
    if(this.edit) {
      this.formGroup.patchValue({
        name: this.selectedClient?.name,
        parentOrganizationUnit: this.selectedClient
      });
    }
  }

  loadClients(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        if(this.edit) {
          const currentOrganizationUnit = this.clientUnitsService.findByClientId(this.treeSelectItems[0], this.selectedClient?.parentOrganizationUnitId!);
          this.formGroup?.get('parentOrganizationUnitId')?.setValue(currentOrganizationUnit);
          this.onParentOrganizationUnitSelect(currentOrganizationUnit!.data);
        } else if(this.selectedClient) {
          const currentOrganizationUnit = this.clientUnitsService.findByClientId(this.treeSelectItems[0], this.selectedClient?.id!);
          this.formGroup?.get('parentOrganizationUnitId')?.setValue(currentOrganizationUnit);
          this.onParentOrganizationUnitSelect(currentOrganizationUnit!.data);
        }
      }
    );
  }

  onParentOrganizationUnitSelect(organizationUnit: IClient): void {
    this.selectedParentClient = organizationUnit;
    this.formGroup?.get('treePath')?.setValue(this.selectedParentClient.treePath! + this.selectedParentClient.id?.toString() + ';');
  }

  onSave(): void {
    if(this.edit) {
      const value: IClient = this.formGroup?.getRawValue();
      value.parentOrganizationUnitId = this.selectedParentClient?.id;
      value.id = this.selectedClient?.id;
      this.clientsService.update(value).subscribe(
        {
          next:() => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('client.dialog.editSuccess')});
            this.onCloseDialog(true);
          },
          error:() => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('client.dialog.editError')});
          }
        }
      );
    } else {
      const value: NewClient = this.formGroup?.getRawValue();
      value.parentOrganizationUnitId = this.selectedParentClient?.id;
      this.clientsService.save(value).subscribe(
        {
          next:() => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('client.dialog.addSuccess')});
            this.onCloseDialog(true);
          },
          error:() => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('client.dialog.addError')});
          }
        }
      );
    }
  }

  onCloseDialog(response = false): void {
    this.ref.close(response);
  }
}
