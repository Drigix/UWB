import { Component, OnInit } from '@angular/core';
import { IObjectType } from '@entities/objects/object-type.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ObjectTypesService } from '@services/objects/object-types.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjectTypesDialogComponent } from './object-types-dialog/object-types-dialog.component';

@Component({
  selector: 'uwb-object-types',
  templateUrl: './object-types.component.html',
  styleUrls: ['../objects.component.scss']
})
export class ObjectTypesComponent implements OnInit {

  objectTypes: IObjectType[] = [];
  columns: UniversalTableColumn[] = [];
  selectedObjectType?: IObjectType;

  constructor(
    private objectTypesService: ObjectTypesService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getObjectTypeColumns();
    this.loadObjectTypes();
  }

  loadObjectTypes(): void {
    this.objectTypesService.findAll().subscribe(
      (res) => {
        this.objectTypes = res;
      }
    );
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
    console.log('DELETE');
  }
}
