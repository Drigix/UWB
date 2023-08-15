import { Component, HostListener, OnInit } from '@angular/core';
import { IObject } from '@entities/objects/object.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ObjectsService } from '@services/objects/objects.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjectsDialogComponent } from './objects-dialog/objects-dialog.component';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {

  objects: IObject[] = [];
  columns: UniversalTableColumn[] = [];
  selectedObject?: IObject;
  pageMode: 'objects' | 'object-types' | 'object-icons' = 'objects';
  isSmallScreen = false;

  constructor(
    private objectsService: ObjectsService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.columns = this.columnService.getObjectColumns();
    this.loadObjects();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth < 900;
  }

  loadObjects(): void {
    this.objectsService.findAll().subscribe(
      (res) => {
        this.objects = res;
      }
    );
  }

  onPageModeChange(pageMode: 'objects' | 'object-types' | 'object-icons'): void {
    this.pageMode = pageMode;
  }

  onObjectSelected(object?: IObject): void {
    this.selectedObject = object ?? undefined;
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(ObjectsDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedObject: this.selectedObject,
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
      this.selectedObject = undefined;
      this.loadObjects();
    }
  }

  handleDeleteDialog(): void {
    console.log('DELETE');
  }
}
