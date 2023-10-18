import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IIcon } from '@entities/icon/icon.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { IconsService } from '@services/icon/icons.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjectIconsDialogComponent } from './object-icons-dialog/object-icons-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { ToastService } from '@shared/toast/toast.service';
import { IClient } from '@entities/client/client.model';
import { IClientUnit } from '@entities/client/client-unit.model';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';

@Component({
  selector: 'uwb-object-icons',
  templateUrl: './object-icons.component.html',
  styleUrls: ['../objects.component.scss']
})
export class ObjectIconsComponent implements OnInit {

  @Input() userOrganizationUnitId?: number;
  @Input() treeSelectItems: IClientUnit[] = [];
  @Input() treeSelectItemSelected?: IClientUnit;
  @Input() selectedOrganizationUnit?: IClient;
  @Input() isSmallScreen = false;
  @Output() emitTreeSelectItem = new EventEmitter<IClient>();
  icons: IIcon[] = [];
  columns: UniversalTableColumn[] = [];
  selectedIcon?: IIcon;
  loading = false;

  constructor(
    private iconsService: IconsService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private arrayBufferService: ArrayBufferService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.columns = this.columnService.getIconColumns();
    this.loadObjectIcons();
  }

  loadObjectIcons(): void {
    this.loading = true;
    this.iconsService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id ?? this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IIcon[]>) => {
        this.icons = res.body ?? [];
        this.icons.forEach(i => i.fullPath = this.arrayBufferService.convertImage(i.pathArrayBuffer!));
        this.loading = false;
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.selectedIcon = undefined;
      this.loadObjectIcons();
      this.emitTreeSelectItem.emit(this.selectedOrganizationUnit);
    }
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
        selectedOrganizationUnit: this.selectedOrganizationUnit
      },
      width: this.isSmallScreen ? '95%' : '40%'
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
      this.loadObjectIcons();
    }
  }

  handleDeleteDialog(): void {
    this.iconsService.delete(this.selectedIcon?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('icon.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('icon.dialog.deleteError')});
        }
      }
    );
  }

}
