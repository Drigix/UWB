import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '@auth/authority.service';
import { IAreaType } from '@entities/area/area-type.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { AreaTypesService } from '@services/areas/area-types.service';
import { ClientsService } from '@services/clients/clients.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ToastService } from '@shared/toast/toast.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AreaTypesDialogComponent } from './area-types-dialog/area-types-dialog.component';

@Component({
  selector: 'uwb-area-types',
  templateUrl: './area-types.component.html',
  styleUrls: ['./area-types.component.scss']
})
export class AreaTypesComponent implements OnInit {

  treeSelectItems: IClientUnit[] = [];
  areaTypes: IAreaType[] = [];
  columns: UniversalTableColumn[] = [];
  userOrganizationUnitId?: number;
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  selectedAreaType?: IObjectType;
  loading = true;

  constructor(
    private authorityService: AuthorityService,
    private clientsService: ClientsService,
    private areaTypesService: AreaTypesService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loadOrganizationUnits();
    this.columns = this.columnService.getAreaTypeColumns();
    this.loadObjectTypes();
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        this.selectedOrganizationUnit = this.treeSelectItemSelected.data;
      }
    );
  }

  loadObjectTypes(): void {
    this.loading = true;
    this.areaTypesService.findAllByOrganizationUnit(this.selectedOrganizationUnit?.id ?? this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IAreaType[]>) => {
        this.areaTypes = res.body ?? [];
        this.loading = false;
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedAreaType = undefined;
      this.loadObjectTypes();
    }
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(AreaTypesDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedAreaType: this.selectedAreaType,
        selectedOrganizationUnit: this.selectedOrganizationUnit
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
      this.selectedAreaType = undefined;
      this.loadObjectTypes();
    }
  }

  handleDeleteDialog(): void {
    this.areaTypesService.delete(this.selectedAreaType?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('areaType.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('areaType.dialog.deleteError')});
        }
      }
    );
  }

}
