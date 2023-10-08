import { Component, OnInit } from '@angular/core';
import { IAreaVertex } from '@entities/area/area-vertex.model';
import { IArea } from '@entities/area/area.model';
import { IBackground } from '@entities/background/background.model';
import { UniversalTableColumn } from '@entities/uwb-table/uwb-column.model';
import { AreaVertexesService } from '@services/areas/area-vertexes.service';
import { AreasService } from '@services/areas/areas.service';
import { BackgroundsService } from '@services/backgrounds/backgrounds.service';
import { ColumnService } from '@shared/uwb-table/column.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AreasDialogComponent } from './areas-dialog/areas-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { HttpResponse } from '@angular/common/http';
import { ArrayBufferService } from '@shared/array-buffer-converter/array-buffer.service';
import { AuthorityService } from '@auth/authority.service';
import { IClientUnit } from '@entities/client/client-unit.model';
import { IClient } from '@entities/client/client.model';
import { ClientsService } from '@services/clients/clients.service';
import { ToastService } from '@shared/toast/toast.service';
import { IAreaType } from '@entities/area/area-type.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
  treeSelectItems: IClientUnit[] = [];
  backgrounds: IBackground[] = [];
  columns: UniversalTableColumn[] = [];
  areas: IArea[] = [];
  handleAreas: IArea[] = [];
  areaVertexes: IAreaVertex[] = [];
  dropdownFilterAreaTypeItems: IAreaType[] = [];
  selectedAreas: IArea [] = [];
  treeSelectItemSelected?: IClientUnit;
  selectedOrganizationUnit?: IClient;
  selectedBackground?: IBackground;
  selectedArea?: IArea;
  userOrganizationUnitId?: number;
  loading = false;

  constructor(
    private authorityService: AuthorityService,
    private columnService: ColumnService,
    private areasService: AreasService,
    private backgroundsService: BackgroundsService,
    private areaVertexesService: AreaVertexesService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService,
    private arrayBufferService: ArrayBufferService,
    private clientsService: ClientsService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.userOrganizationUnitId = this.authorityService.getUserOrganizationUnitId();
    this.columns = this.columnService.getAreaColumns();
    this.loadOrganizationUnits();
    this.loadBackgrounds();
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

  loadBackgrounds(): void {
    this.backgroundsService.findAllByUserOrganizationUnit(this.selectedOrganizationUnit?.id ?? this.userOrganizationUnitId!).subscribe(
      (res: HttpResponse<IBackground[]>) => {
        this.backgrounds = res.body ?? [];
        this.backgrounds.forEach(b => b.fullPath = this.arrayBufferService.convertImage(b.pathArrayBuffer!));
      }
    );
  }

  loadAreas(backgroundId: number): void {
    this.loading = true;
    this.areasService.findAllByBackground(backgroundId).subscribe((res: HttpResponse<IArea[]>) => {
      this.areas = res.body ?? [];
      this.handleAreas = this.areas;
      this.loadAreaTypes();
      this.loading = false;
    });
  }

  loadAreaTypes(): void {
    const filteredArea: IArea[] = this.areas.filter(a => (a.areaType !== undefined));
    const uniqueAreaTypes: IAreaType[] = [];
    filteredArea.forEach(a => {
      if(!uniqueAreaTypes.some(at => at.id === a.areaType?.id)) {
        uniqueAreaTypes.push(a.areaType!);
      }
    });
    this.dropdownFilterAreaTypeItems = uniqueAreaTypes;
  }

  loadAreaVertexes(areaId: number): void {
    this.areaVertexesService.findAllByArea(areaId).subscribe((res: HttpResponse<IAreaVertex[]>) => {
      this.areaVertexes = res.body ?? [];
    });
  }

  onOrganizationUnitSelect(organizationUnit: IClient): void {
    if(this.selectedOrganizationUnit?.id !== organizationUnit.id) {
      this.selectedOrganizationUnit = organizationUnit;
      this.treeSelectItemSelected = this.clientsService.findByIdFromUnits(this.treeSelectItems[0], this.selectedOrganizationUnit.id!)!;
      this.selectedBackground = undefined;
      this.loadBackgrounds();
    }
  }

  onBackgroundSelect(background: IBackground): void {
    this.selectedBackground = background ?? undefined;
    this.selectedArea = undefined;
    this.areaVertexes = [];
    this.loadAreas(this.selectedBackground?.id!);
  }

  onAreaSelect(area: IArea): void {
    this.selectedArea = area ?? undefined;
    if(this.selectedArea) {
      this.loadAreaVertexes(this.selectedArea?.id!);
    }
  }

  onAreaTypeFilterSelected(areaTypeId: number): void {
    this.areas = areaTypeId ? this.handleAreas.filter(o => o.areaType?.id === areaTypeId) : this.handleAreas;
  }

  onShowAllAreasClick(): void {
    this.selectedAreas = this.areas;
    this.areaVertexesService.findAllByBackground(this.selectedBackground?.id!).subscribe(
      (res: HttpResponse<IAreaVertex[]>) => {
        this.areaVertexes = res.body ?? [];
      }
    )
  }

  onSaveVertexes(response: boolean): void {
    if(response) {
      this.loadAreaVertexes(this.selectedArea?.id!);
    }
  }

  openDialog(edit = false): void {
    const ref = this.dialogService.open(AreasDialogComponent, {
      header: this.translateService.instant(
        edit ? 'global.dialog.editHeader' : 'global.dialog.addHeader'
      ),
      data: {
        edit,
        selectedBackground: this.selectedBackground,
        selectedArea: this.selectedArea,
      },
      width: '40%'
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
      this.selectedArea = undefined;
      this.loadAreas(this.selectedBackground?.id!);
    }
  }

  handleDeleteDialog(): void {
    this.areasService.delete(this.selectedArea?.id!).subscribe(
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
