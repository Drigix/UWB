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

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
  backgrounds: IBackground[] = [];
  selectedBackground?: IBackground;
  columns: UniversalTableColumn[] = [];
  areas: IArea[] = [];
  selectedArea?: IArea;
  areaVertexes: IAreaVertex[] = [];

  constructor(
    private columnService: ColumnService,
    private areasService: AreasService,
    private backgroundsService: BackgroundsService,
    private areaVertexesService: AreaVertexesService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.loadBackgrounds();
    this.columns = this.columnService.getAreaColumns();
  }

  loadBackgrounds(): void {
    this.backgroundsService.findAll().subscribe((res) => {
      this.backgrounds = res;
    });
  }

  loadAreas(backgroundId: number): void {
    this.areasService.findAll().subscribe((res) => {
      this.areas = res;
      this.areas = this.areas.filter(
        (area) => area.background?.id === backgroundId
      );
    });
  }

  loadAreaVertexes(areaId: number): void {
    this.areaVertexesService.findAll().subscribe((res) => {
      this.areaVertexes = res;
      this.areaVertexes = this.areaVertexes.filter(
        (areaVertex) => areaVertex.area?.id === areaId
      );
    });
  }

  onBackgroundSelect(event: any): void {
    this.selectedBackground = event;
    this.loadAreas(this.selectedBackground?.id!);
  }

  onAreaSelect(event: any): void {
    this.selectedArea = event;
    this.loadAreaVertexes(this.selectedArea?.id!);
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
    });
    ref.onClose.subscribe((response) => this.handleDialogResponse(response));
  }

  openDeleteDialog(): void {
    this.confirmDialogService.openDeleteDialog({}, (confirmed: boolean) => {
      confirmed ? this.handleDeleteDialog() : null;
    });
  }

  handleDialogResponse(response: any) {}

  handleDeleteDialog(): void {
    console.log('DELETE');
  }
}
