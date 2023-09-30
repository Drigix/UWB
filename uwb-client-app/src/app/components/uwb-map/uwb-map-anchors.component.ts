import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { UwbMap } from './uwb-map.component';
import { IAnchor } from '@entities/anchor/anchor.model';
import { Style } from 'ol/style';
import { anchorMapIconStyle } from '@entities/anchor/anchor-map-style';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { MapOverlayType } from '@entities/uwb-map/map-options.type';
import { toLonLat } from 'ol/proj';

@Component({
  selector: 'uwb-map-anchors',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMapAnchorsComponent
  extends UwbMap
  implements OnInit, OnChanges
{
  constructor(
    protected override cd: ChangeDetectorRef,
    protected override renderer: Renderer2
  ) {
    super(cd, renderer);
  }

  override ngOnInit() {
    this.overlayType = MapOverlayType.ANCHOR;
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if (changes['anchors'] || changes['mapClickMode']) {
      this.loadPoints(anchorMapIconStyle);
      this.loadOnMapClickOptions(anchorMapIconStyle);
    }
    if (changes['selectedMapPoint'] && this.selectedMapPoint) {
      const feature = this.source.getFeatureById(
        'anchor_' + this.selectedMapPoint.id
      );
      const geometry = feature?.getGeometry();
      if (geometry instanceof Point) {
        const pointGeometry = geometry as Point;
        const coordinates = pointGeometry.getCoordinates();
        this.overlay.setPosition(coordinates);
        this.cd.detectChanges();
      }
    }
  }

  loadPoints(style: Style): void {
    this.overlay.setPosition(undefined);
    this.source.clear();
    if (this.mapClickMode === 'else') {
      this.showOverlay = true;
      this.selectedMapPoint = undefined;
      this.anchors.forEach((anchor) => {
        let id = 'anchor_' + 'NEW';
        if (anchor.id !== null) {
          id = 'anchor_' + anchor.id;
        }
        this.addPointToMap([anchor.xPx!, anchor.yPx!], id, style);
        this.source.changed();
      });
    } else if (this.mapClickMode === 'edit') {
      this.showOverlay = false;
      const searchAnchor = this.selectedMapPoint as IAnchor;
      this.addPointToMap([searchAnchor.xPx!, searchAnchor.yPx!], 'anchor_' + searchAnchor.id, style);
    }
  }

  loadOnMapClickOptions(style: Style): void {
    this.map.on('click', (event) => {
      if (this.mapClickMode === 'add') {
        const existingFeature = this.source.getFeatureById('anchor_NEW');
        const newCoordinates = this.map.getCoordinateFromPixel(event.pixel);
        if (existingFeature) {
          existingFeature.setGeometry(new Point(newCoordinates));
        } else {
          this.addPointToMap(newCoordinates, 'anchor_NEW', style);
        }
        this.source.changed();
        const newAnchor: IAnchor = { x: newCoordinates[0], y: newCoordinates[1] };
        this.selectedMapPoint = newAnchor;
        this.emitNewPoint.emit(this.selectedMapPoint);
      } else if(this.mapClickMode === 'edit') {
        const newCoordinates = this.map.getCoordinateFromPixel(event.pixel);
        const existingFeature = this.source.getFeatureById('anchor_' + this.selectedMapPoint.id);
        existingFeature?.setGeometry(new Point(newCoordinates));
        this.selectedMapPoint = {...this.selectedMapPoint, x: newCoordinates[0], y: newCoordinates[1] };
        this.source.changed();
        this.emitNewPoint.emit(this.selectedMapPoint);
      } else {
        if (this.map.getFeaturesAtPixel(event.pixel).length > 0) {
          const id = this.map
            .getFeaturesAtPixel(event.pixel)[0]
            .getId() as string;
          if (id.startsWith('anchor_')) {
            this.selectedMapPoint = this.anchors.find(
              (anchor) => anchor.id === parseInt(id.split('_')[1], 10)
            );
            this.overlay.setPosition(event.coordinate);
            this.cd.detectChanges();
          } else {
            this.overlay.setPosition(undefined);
          }
        }
      }
    });
  }
}
