import { Component, OnInit } from '@angular/core';
import { IBackground } from '@entities/background/background.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BackgroundsDialogComponent } from './backgrounds-dialog/backgrounds-dialog.component';
import { CalibrateDialogComponent } from './calibrate-dialog/calibrate-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { ToastService } from '@shared/toast/toast.service';
import { IClientUnit } from '@entities/client/client-unit.model';
import { ClientsService } from '@services/clients/clients.service';
import { IClient } from '@entities/client/client.model';
import { AuthorityService } from '@auth/authority.service';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';

@Component({
  selector: 'uwb-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  backgrounds: IBackground[] = [];
  treeSelectItems: IClientUnit[] = [];
  selectedBackground?: IBackground;
  selectedOrganizationUnit?: IClient;
  userOrganizationUnitId?: number;
  loading = false;

  constructor(
    private backgroundsService: BackgroundsService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private toastService: ToastService,
    private clientsService: ClientsService,
    private authorityService: AuthorityService,
    private arrayBufferService: ArrayBufferService
    ) {}

  ngOnInit() {
    this.loading = true;
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.columns = this.columnService.getBackgroundColumns();
    this.loadOrganizationUnits();
    this.loadBackgrounds();
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
      }
    );
  }

  loadBackgrounds(): void {
    this.loading = true;
    this.backgroundsService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id ?? this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IBackground[]>) => {
        this.backgrounds = res.body ?? [];
        this.backgrounds.forEach(b => b.fullPath = this.arrayBufferService.convertImage(b.pathArrayBuffer!));
        this.loading = false;
      }
    );
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    this.selectedOrganizationUnit = organizationUnit;
    this.selectedBackground = undefined;
    this.loadBackgrounds();
  }

  onBackgroundSelect(background: IBackground): void {
    if(background) {
      this.selectedBackground = background;
    } else {
      this.selectedBackground = undefined;
    }
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(BackgroundsDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedBackground: this.selectedBackground,
      },
    });
    ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  openCalibrateBackgroundDialog(): void {
    const ref = this.dialogService.open(CalibrateDialogComponent, {
      header: this.translateService.instant(
        'global.dialog.calibrateHeader'
      ),
      data: {
        selectedBackground: this.selectedBackground,
      },
      width: '90%'
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
      this.selectedBackground = undefined;
      this.loadBackgrounds();
    }
  }

  handleDeleteDialog(): void {
    this.backgroundsService.delete(this.selectedBackground?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('background.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('background.dialog.deleteError')});
        }
      }
    );
  }
}
