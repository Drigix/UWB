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

@Component({
  selector: 'uwb-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent implements OnInit {

  columns: UniversalTableColumn[] = [];
  backgrounds: IBackground[] = [];
  selectedBackground?: IBackground;
  showPreviewBackgroundDialog = false;

  constructor(
    private backgroundsService: BackgroundsService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService
    ) {}

  ngOnInit() {
    this.columns = this.columnService.getBackgroundColumns();
    this.loadBackgrounds();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAll().subscribe(
      (res) => {
        this.backgrounds = res;
      }
    );
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

  openPreviewBackgroundDialog(): void {
    this.showPreviewBackgroundDialog = true;
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
    console.log('DELETE');
  }
}
