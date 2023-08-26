import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { UwbMap } from './uwb-map.component';
import { IAnchor } from '@entities/anchor/anchor.model';
import { Fill, Stroke, Style } from 'ol/style';
import { anchorMapIconStyle } from '@entities/anchor/anchor-map-style';
import { Feature } from 'ol';
import { Point, Polygon } from 'ol/geom';
import { IArea } from '@entities/area/area.model';
import { IAreaVertex, NewAreaVertex } from '@entities/area/area-vertex.model';
import { chunk } from 'lodash';

@Component({
  selector: 'uwb-map-areas',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss']
})

export class UwbMapAreasComponent extends UwbMap implements OnInit, OnChanges {

  constructor(protected override cd: ChangeDetectorRef, protected override renderer: Renderer2) {
    super(cd, renderer)
  }

  override ngOnInit() { }

  override ngOnChanges(changes: SimpleChanges): void {
    if(changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if(changes['area']) {
      this.vertexBackgroundColor = this.area?.color!;
      this.vertexColor = this.area?.color!;
      this.loadLayer();
    }
    if(changes['vertexes']) {
      this.loadVertexes();
    }
  }

  loadVertexes(): void {
    this.clearVertex();
    const area = this.vertexes[0].area;
    const mapVertexes: (any | undefined)[] = [];
    this.vertexes.forEach((v) => {
      const mapVertex = JSON.parse('[' + v.x + ',' + v.y + ']');
      mapVertexes.push(mapVertex);
    });
    const newPolygon = new Feature(
      new Polygon([mapVertexes])
    );
    newPolygon.setId('area_' + area?.id);
    const areaStyle = new Style({
      fill: new Fill({
        color: area?.color + this.vertexAlfa
      }),
      stroke: new Stroke({
        color: area?.color,
        width: 3
      })
    });
    newPolygon.setStyle(areaStyle);
    this.source.addFeature(newPolygon);
    this.source.changed();
  }
}
