import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IObjectType } from '@entities/objects/object-type.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ObjectTypesService } from '@services/objects/object-types.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjectTypesDialogComponent } from './object-types-dialog/object-types-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { ToastService } from '@shared/toast/toast.service';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';

@Component({
  selector: 'uwb-object-types',
  templateUrl: './object-types.component.html',
  styleUrls: ['../objects.component.scss']
})
export class ObjectTypesComponent implements OnInit {

  @Input() userOrganizationUnitId?: number;
  @Input() treeSelectItems: IClientUnit[] = [];
  @Input() treeSelectItemSelected?: IClientUnit;
  @Input() selectedOrganizationUnit?: IClient;
  @Output() emitTreeSelectItem = new EventEmitter<IClient>();
  objectTypes: IObjectType[] = [];
  columns: UniversalTableColumn[] = [];
  selectedObjectType?: IObjectType;
  loading = false;

  constructor(
    private objectTypesService: ObjectTypesService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private arrayBufferService: ArrayBufferService
  ) { }

  ngOnInit() {
    console.log('xd');
    this.loading = true;
    this.columns = this.columnService.getObjectTypeColumns();
    this.loadObjectTypes();
  }

  loadObjectTypes(): void {
    this.loading = true;
    this.objectTypesService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id ?? this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IObjectType[]>) => {
        this.objectTypes = res.body ?? [];
        this.objectTypes.forEach(o => {
          o.uwbObjectIcon!.fullPath = this.arrayBufferService.convertImage(o.uwbObjectIcon?.pathArrayBuffer!);
        });
        this.loading = false;
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    this.selectedOrganizationUnit = organizationUnit;
    this.selectedObjectType = undefined;
    this.loadObjectTypes();
    this.emitTreeSelectItem.emit(this.selectedOrganizationUnit);
  }

  onObjectTypeSelected(objectType?: IObjectType): void {
    this.selectedObjectType = objectType ?? undefined;
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(ObjectTypesDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedObjectType: this.selectedObjectType,
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
      this.selectedObjectType = undefined;
      this.loadObjectTypes();
    }
  }

  handleDeleteDialog(): void {
    this.objectTypesService.delete(this.selectedObjectType?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('objectType.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('objectType.dialog.deleteError')});
        }
      }
    );
  }
}
