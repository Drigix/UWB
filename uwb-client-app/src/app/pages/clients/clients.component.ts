import { Component, OnInit } from '@angular/core';
import { IClient } from '@entities/client/client.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ClientUnitsService } from '@services/clients/client-units.service';
import { ClientsService } from '@services/clients/clients.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';

@Component({
  selector: 'uwb-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  clients: IClient[] = [];
  selectedClient?: IClient;
  parentOfSelectedClient?: number;

  constructor(
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private clientsService: ClientsService,
    private clientUnitsService: ClientUnitsService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getClientColumns();
    this.loadClientUnits();
  }

  loadClientUnits(): void {
    this.clientUnitsService.findAll().subscribe(
      (res) => {
        this.clients = res;
      }
    );
  }

  onClientChange(event: { selectedValue: IClient, parentOfSelectedValue: number }): void {
    this.selectedClient = event.selectedValue;
    this.parentOfSelectedClient = event.parentOfSelectedValue;
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(ClientsDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedClient: this.selectedClient,
      },
    });
    ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  openDeleteDialog(): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog() : null;
    });
  }

  handleDialogResponse(response: any) {
    if(response) {
      this.selectedClient = undefined;
      this.loadClientUnits();
    }
  }

  handleDeleteDialog(): void {
    console.log('DELETE');
  }
}
