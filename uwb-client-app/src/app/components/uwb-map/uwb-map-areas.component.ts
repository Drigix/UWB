import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { UwbMap } from './uwb-map.component';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { Feature } from 'ol';
import { Polygon } from 'ol/geom';
import { IArea } from '@entities/area/area.model';
import { IAreaVertex, NewAreaVertex } from '@entities/area/area-vertex.model';
import { chunk } from 'lodash';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { AreaVertexesService } from '@services/areas/area-vertexes.service';
import { ToastService } from '@shared/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'uwb-map-areas',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMapAreasComponent extends UwbMap implements OnInit, OnChanges {

  @Input() selectedaAreas: IArea[] = [];
  @Output() emitChangeVertexes = new EventEmitter();

  constructor(
    protected override cd: ChangeDetectorRef,
    protected override renderer: Renderer2,
    private confirmDialogService: ConfirmDialogService,
    private areaVertexesService: AreaVertexesService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {
    super(cd, renderer);
  }

  override ngOnInit() {}

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if (changes['area']) {
      this.vertexBackgroundColor = this.area?.color!;
      this.vertexColor = this.area?.color!;
      this.loadLayer();
    }
    if (changes['vertexes']) {
      this.loadVertexes();
    }
  }

  override loadVertexes(): void {
    this.clearVertex();
    if (this.vertexes.length > 0) {
      if(this.selectedaAreas.length > 0) {
        this.selectedaAreas.forEach( area => {
          const labelStyle = new Style({
            text: new Text({
              text: area?.name!,
              font: '25px Arial',
              fill: new Fill({ color: area?.color }),
              stroke: new Stroke({
                color: 'black',
                width: 3,
              })
            })
          });
        const mapVertexes: (any | undefined)[] = [];
        const currentAreaVertexes = this.vertexes.filter(v => v.areaId === area.id);
        currentAreaVertexes.forEach((v) => {
          const mapVertex = JSON.parse('[' + v.x + ',' + v.y + ']');
          mapVertexes.push(mapVertex);
        });
        const newPolygon = new Feature(new Polygon([mapVertexes]));
        newPolygon.setId('area_' + area?.id);
        const areaStyle = new Style({
          fill: new Fill({
            color: area?.color + this.vertexAlfa,
          }),
          stroke: new Stroke({
            color: area?.color,
            width: 3,
          }),
        });
        newPolygon.setStyle([areaStyle, labelStyle]);
        this.source.addFeature(newPolygon);
      });
      this.source.changed();
      } else {
        const area = this.area;
        const labelStyle = new Style({
          text: new Text({
            text: area?.name!,
            font: '30px Arial',
            fill: new Fill({ color: area?.color }),
            stroke: new Stroke({
              color: 'black',
              width: 2,
            })
          })
        });
        const mapVertexes: (any | undefined)[] = [];
        this.vertexes.forEach((v) => {
          const mapVertex = JSON.parse('[' + v.x + ',' + v.y + ']');
          mapVertexes.push(mapVertex);
        });
        const newPolygon = new Feature(new Polygon([mapVertexes]));
        newPolygon.setId('area_' + area?.id);
        const areaStyle = new Style({
          fill: new Fill({
            color: area?.color + this.vertexAlfa,
          }),
          stroke: new Stroke({
            color: area?.color,
            width: 3,
          }),
        });
        newPolygon.setStyle([areaStyle, labelStyle]);
        this.source.addFeature(newPolygon);
        this.source.changed();
      }
    }
  }

  override onModifyClick(): void {
    this.modified = !this.modified;
    if (this.modified) {
      this.loadModifyOption();
    } else {
      this.clearModifyInteractions();
    }
  }

  getVertexesFromFeature(): NewAreaVertex[] | IAreaVertex[] | number[] {
    const feature = this.source.getFeatures()[0];
    const area = this.area;
    if (feature != null) {
      const coordinates = feature.getProperties()['geometry'].getFlatCoordinates();
      const ids = feature.getProperties()
      const vertexList = chunk(coordinates, 2).map(
        (coord3857: any[], index) => {
          const vertex: NewAreaVertex | IAreaVertex = {
            lp: index,
            x: coord3857[0],
            y: coord3857[1],
            areaId: area?.id,
          };
          return vertex;
        }
      );
      return vertexList;
    }
    return [];
  }

  override saveVertex(): void {
    if(this.modified) {
      const vertexList = this.getVertexesFromFeature() as IAreaVertex[];
      vertexList.forEach(v => {
        const searchVertex = this.vertexes.find( vx => vx.lp === v.lp);
        v.id = searchVertex?.id ?? undefined;
      });
      this.areaVertexesService.updateList(vertexList).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('areaVertex.dialog.editSuccess')});
            this.emitChangeVertexes.emit(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('areaVertex.dialog.editError')});
          }
        }
      );
    } else {
      const vertexList = this.getVertexesFromFeature() as NewAreaVertex[];
      this.areaVertexesService.createList(vertexList).subscribe(
        {
          next: () => {
            this.toastService.showSuccessToast({summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('areaVertex.dialog.addSuccess')});
            this.emitChangeVertexes.emit(true);
          },
          error: () => {
            this.toastService.showErrorToast({summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('areaVertex.dialog.addError')});
          }
        }
      );
    }
  }

  override deleteVertex(): void {
    if(this.vertexes.length > 0) {
      const vertexes: number[] = this.vertexes.map(v => v.id!);
      this.confirmDialogService.openDeleteDialog({message: this.translateService.instant('areaVertex.dialog.deleteMessage')}, (confirmed: boolean) => {
        confirmed ? this.handleDeleteDialog(vertexes) : null;
      });
    } else {
      this.clearVertex();
    }
  }

  handleDeleteDialog(vertexIds: number[]): void {
    this.areaVertexesService.deleteList(vertexIds).subscribe({
      next: () => {
        this.toastService.showSuccessToast({ summary: this.translateService.instant('global.toast.header.success'), detail: this.translateService.instant('areaVertex.dialog.deleteSuccess')});
        this.emitChangeVertexes.emit(true);
      },
      error: (err) => {
        this.toastService.showErrorToast({
          summary: this.translateService.instant('global.toast.header.error'), detail: this.translateService.instant('areaVertex.dialog.deleteError'),
        });
      },
    });
  }
}
