import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { UwbMap } from './uwb-map.component';
import { IAnchor } from '@entities/anchor/anchor.model';
import { Fill, Stroke, Style, Text } from 'ol/style';
import { anchorMapIconStyle } from '@entities/anchor/anchor-map-style';
import { Feature } from 'ol';
import { Point, Polygon } from 'ol/geom';
import { IArea } from '@entities/area/area.model';
import { IAreaVertex, NewAreaVertex } from '@entities/area/area-vertex.model';
import { chunk } from 'lodash';
import { localizationMapIconStyle } from '@entities/localization/localization-map.style';
import { MapOverlayType } from '@entities/uwb-map/map-options.type';

@Component({
  selector: 'uwb-map-localizations',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMapLocalizationsComponent extends UwbMap implements OnInit, OnChanges, OnDestroy {
  @Input() localizations: any[] = [];
  @Input() selectedAreas: IArea[] = [];
  localizationInterval?: NodeJS.Timer;

  constructor(
    protected override cd: ChangeDetectorRef,
    protected override renderer: Renderer2
  ) {
    super(cd, renderer);
  }

  override ngOnInit() {
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if(changes['localizations'] || changes['anchors']) {
      if(this.localizations.length > 0 || this.anchors.length > 0) {
        this.loadPoints(localizationMapIconStyle, anchorMapIconStyle);
      } else {
        this.source.clear();
        this.selectedMapPoint = undefined;
        this.overlay.setPosition(undefined);
      }
    this.loadOnMapClickOptions(localizationMapIconStyle);
    }
  }

  override ngOnDestroy(): void {
    clearInterval(this.localizationInterval);
  }

  loadPoints(style: Style, anchorStyle: Style): void {
    this.loadVertexes();
    this.loadAnchors(anchorStyle);
    this.localizations.forEach((localization) => {
      const existPoint = this.source.getFeatureById('tag_' + localization.tagId);
      if(existPoint) {
        this.source.removeFeature(existPoint);
      }
      const feature = new Feature(
        new Point([localization.xPx!, localization.yPx!])
      );
      if (localization.tagId !== null) {
        feature.setId('tag_' + localization.tagId);
      } else {
        feature.setId('tag_' + 'NEW');
      }
      if(localization.tagId === this.selectedMapPoint?.tagId) {
        this.overlay.setPosition([localization.xPx!, localization.yPx!]);
      }
      feature.setStyle(style);
      this.source.addFeature(feature);
      this.source.changed();
    });
  }

  loadAnchors(style: Style): void {
      this.anchors.forEach((anchor) => {
        const feature = new Feature(new Point([anchor.xPx!, anchor.yPx!]));
        if (anchor.id !== null) {
          feature.setId('anchor_' + anchor.id);
        } else {
          feature.setId('anchor_' + 'NEW');
        }
        feature.setStyle(style);
        this.source.addFeature(feature);
        this.source.changed();
      });
  }

  override loadVertexes(): void {
    this.clearVertex();
    if (this.vertexes.length > 0) {
      if(this.selectedAreas.length > 0) {
        this.selectedAreas.forEach( area => {
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
    }
  }
}

  loadOnMapClickOptions(style: Style): void {
    this.map.on('click', (event) => {
      if (this.map.getFeaturesAtPixel(event.pixel).length > 0) {
        const id = this.map
          .getFeaturesAtPixel(event.pixel)[0]
          .getId() as string;
        if (id.startsWith('tag_')) {
          this.selectedMapPoint = this.localizations.find(
            (loc) => loc.tagId === id.split('_')[1]
          );
          this.overlayType = MapOverlayType.TAG;
          this.overlay.setPosition(event.coordinate);
        } else if(id.startsWith('anchor_')) {
          this.selectedMapPoint = this.anchors.find(
            (anchor) => anchor.id === parseInt(id.split('_')[1], 10)
          );
          this.overlayType = MapOverlayType.ANCHOR;
          this.overlay.setPosition(event.coordinate);
        } else {
          this.overlay.setPosition(undefined);
        }
        this.cd.detectChanges();
      }
    });
  }
}
