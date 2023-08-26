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
import { Fill, Stroke, Style } from 'ol/style';
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
  localizationInterval?: NodeJS.Timer;

  constructor(
    protected override cd: ChangeDetectorRef,
    protected override renderer: Renderer2
  ) {
    super(cd, renderer);
  }

  override ngOnInit() {}

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if(changes['localizations'] || changes['anchors']) {
      if(this.localizations.length > 0 || this.anchors.length > 0) {
        this.loadPoints(localizationMapIconStyle, anchorMapIconStyle);
        this.loadOnMapClickOptions(localizationMapIconStyle);
      }
    }
  }

  override ngOnDestroy(): void {
    clearInterval(this.localizationInterval);
  }

  loadPoints(style: Style, anchorStyle: Style): void {
    this.overlay.setPosition(undefined);
    this.selectedMapPoint = undefined;
    this.loadAnchors(anchorStyle);
    this.mapInterval = setInterval(() => {
      this.localizations.forEach((localization) => {
        const existPoint = this.source.getFeatureById('tag_' + localization.objectId);
        if(existPoint) {
          this.source.removeFeature(existPoint);
        }
        const feature = new Feature(
          new Point([localization.xPx!, localization.yPx!])
        );
        if (localization.objectId !== null) {
          feature.setId('tag_' + localization.objectId);
        } else {
          feature.setId('tag_' + 'NEW');
        }
        if(localization.objectId === this.selectedMapPoint?.objectId) {
          this.overlay.setPosition([localization.xPx!, localization.yPx!]);
        }
        feature.setStyle(style);
        this.source.addFeature(feature);
        this.source.changed();
      });

    }, 1000);
  }

  loadAnchors(style: Style): void {
      this.anchors.forEach((anchor) => {
        console.log(anchor);
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

  loadOnMapClickOptions(style: Style): void {
    this.map.on('click', (event) => {
      if (this.map.getFeaturesAtPixel(event.pixel).length > 0) {
        const id = this.map
          .getFeaturesAtPixel(event.pixel)[0]
          .getId() as string;
        if (id.startsWith('tag_')) {
          this.selectedMapPoint = this.localizations.find(
            (loc) => loc.objectId === parseInt(id.split('_')[1], 10)
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
