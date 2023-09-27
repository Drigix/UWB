import { Component, HostListener, OnInit } from '@angular/core';
import { IObject } from '@entities/objects/object.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { TranslateService } from '@ngx-translate/core';
import { ObjectsService } from '@services/objects/objects.service';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ObjectsDialogComponent } from './objects-dialog/objects-dialog.component';
import { ClientsService } from '@services/clients/clients.service';
import { IClientUnit } from '@entities/client/client-unit.model';
import { HttpResponse } from '@angular/common/http';
import { AuthorityService } from '@auth/authority.service';
import { ToastService } from '@shared/toast/toast.service';
import { IClient } from '@entities/client/client.model';
import { IObjectType } from '@entities/objects/object-type.model';
import { ObjectTypesService } from '@services/objects/object-types.service';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {

  treeSelectItems: IClientUnit[] = [];
  userOrganizationUnitId?: number;
  objects: IObject[] = [];
  handleObjects: IObject[] = [];
  columns: UniversalTableColumn[] = [];
  dropdownFilterObjectTypeItems: IObjectType[] = [];
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  handleSelectedOrganizationUnit?: IClient;
  selectedObject?: IObject;
  pageMode: 'objects' | 'object-types' | 'object-icons' = 'objects';
  isSmallScreen = false;
  loading = false;
  loadingFilter = false;

  constructor(
    private objectsService: ObjectsService,
    private columnService: ColumnService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private clientsService: ClientsService,
    private authorityService: AuthorityService,
    private toastService: ToastService,
    private arrayBufferService: ArrayBufferService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.loadOrganizationUnits();
    this.columns = this.columnService.getObjectColumns();
    this.loadObjects();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = event.target.innerWidth < 900;
  }

  loadOrganizationUnits(): void {
    this.clientsService.findTree().subscribe(
      (res: HttpResponse<IClientUnit[]>) => {
        this.treeSelectItems = res.body ?? [];
        this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.userOrganizationUnitId!)!;
        this.selectedOrganizationUnit = this.treeSelectItemSelected.data;
        this.handleSelectedOrganizationUnit = this.treeSelectItemSelected.data;
      }
    );
  }

  loadObjects(): void {
    this.loading = true;
    this.objectsService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id! ?? this.userOrganizationUnitId).subscribe(
      (res: HttpResponse<IObject[]>) => {
        this.objects = res.body ?? [];
        this.objects.forEach(o => {
          o.uwbObjectType!.uwbObjectIcon!.fullPath = this.arrayBufferService.convertImage(o.uwbObjectType?.uwbObjectIcon?.pathArrayBuffer!);
        });
        this.handleObjects = this.objects;
        this.loadObjectTypes();
        this.loading = false;
      }
    );
  }

  loadObjectTypes(): void {
    const filteredObjects: IObject[] = this.objects.filter(o => (o.uwbObjectType !== undefined));
    const uniqueObjectTypes: IObjectType[] = [];
    filteredObjects.forEach(o => {
      if(!uniqueObjectTypes.some(ot => ot.id === o.uwbObjectType?.id)) {
        uniqueObjectTypes.push(o.uwbObjectType!);
      }
    });
    this.dropdownFilterObjectTypeItems = uniqueObjectTypes;
  }

  onPageModeChange(pageMode: 'objects' | 'object-types' | 'object-icons'): void {
    this.pageMode = pageMode;
    if(pageMode === 'objects' && this.handleSelectedOrganizationUnit !== this.selectedOrganizationUnit) {
      this.selectedOrganizationUnit = this.handleSelectedOrganizationUnit;
      this.loadObjects();
    }
  }

  onObjectSelected(object?: IObject): void {
    this.selectedObject = object ?? undefined;
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.handleSelectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedObject = undefined;
      this.loadObjects();
    }
  }

  onObjectTypeFilterSelected(objectTypeId?: number): void {
    this.objects = objectTypeId ? this.handleObjects.filter(o => o.uwbObjectType?.id === objectTypeId) : this.handleObjects;
  }

  onEmitTreeSelectItem(organizationUnit: IClient): void {
    if(organizationUnit !== this.handleSelectedOrganizationUnit) {
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], organizationUnit.id!)!;
      this.handleSelectedOrganizationUnit = this.treeSelectItemSelected.data;
    }
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(ObjectsDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedObject: this.selectedObject,
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
      this.selectedObject = undefined;
      this.loadObjects();
    }
  }

  handleDeleteDialog(): void {
    this.objectsService.delete(this.selectedObject?.id!).subscribe(
      {
        next: () => {
          this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('object.dialog.deleteSuccess')});
          this.handleDialogResponse(true);
        },
        error: (err) => {
          this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('object.dialog.deleteError')});
        }
      }
    );
  }
}
