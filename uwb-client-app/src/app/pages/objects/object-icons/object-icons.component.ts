import { Component, OnInit } from '@angular/core';
import { IIcon } from '@entities/icon/icon.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from '@services/icon/icons.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjectIconsDialogComponent } from './object-icons-dialog/object-icons-dialog.component';

@Component({
  selector: 'uwb-object-icons',
  templateUrl: './object-icons.component.html',
  styleUrls: ['../objects.component.scss']
})
export class ObjectIconsComponent implements OnInit {

  icons: IIcon[] = [];
  columns: UniversalTableColumn[] = [];
  selectedIcon?: IIcon;

  constructor(
    private iconsService: IconsService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getIconColumns();
    this.loadObjectTypes();
  }

  loadObjectTypes(): void {
    this.iconsService.findAll().subscribe(
      (res) => {
        this.icons = res;
      }
    );
  }

  onIconSelected(icon?: IIcon): void {
    this.selectedIcon = icon ?? undefined;
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(ObjectIconsDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedIcon: this.selectedIcon,
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
      this.selectedIcon = undefined;
      this.loadObjectTypes();
    }
  }

  handleDeleteDialog(): void {
    console.log('DELETE');
  }

}
