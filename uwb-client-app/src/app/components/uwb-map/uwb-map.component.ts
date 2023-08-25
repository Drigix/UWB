import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Static from 'ol/source/ImageStatic.js';
import Projection from 'ol/proj/Projection.js';
import { getCenter } from 'ol/extent.js';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Circle, Icon, Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { Feature, Overlay } from 'ol';
import { transform } from 'ol/proj';
import { IAreaVertex, NewAreaVertex } from '@entities/area/area-vertex.model';
import { Point, Polygon } from 'ol/geom';
import { never } from 'ol/events/condition';
import { IArea } from '@entities/area/area.model';
import { chunk, over } from 'lodash';
import { IAnchor } from '@entities/anchor/anchor.model';
import CircleStyle from 'ol/style/Circle';
import { anchorMapIconStyle } from '@entities/anchor/anchor-map-style';
import { localizationMapIconStyle } from '@entities/localization/localization-map.style';


enum MapPointType {
  ANCHOR = 'anchor',
  TAG = 'tag'
};

@Component({
  selector: 'uwb-map',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMap implements OnInit, OnChanges {
  /*INPUT DATA*/
  @Input() background = '';
  @Input() area?: IArea;
  @Input() vertexes: IAreaVertex[] = [];
  @Input() anchors: IAnchor[] = [];
  @Input() localizations: any[] = [];
  /*BUTTONS OPTION*/
  @Input() drawable = false;
  @Input() drawableLineString = false;
  @Input() modified = false;
  @Input() clear = false;
  /*INPUT STYLES */
  @Input() vertexAlfa = '66';
  @Input() vertexBackgroundColor = '#8f8f8f';
  @Input() vertexColor = '#ffcc33';
  @Input() mapWithButtons = false;
  @Input() disabledMapButtons = false;
  @Input() styleClass = 'h-full';
  /*INPUT MAP CLICK OPTION */
  @Input() mapClickMode: 'add' | 'else' = 'else';
  @Output() emitLengthLineString = new EventEmitter<number>();
  @Output() emitNewPoint = new EventEmitter();
  @Output() emitEditSelectedPoint = new EventEmitter();
  @Output() emitDeleteSelectedPoint = new EventEmitter();
  map!: Map;
  source!: VectorSource;
  extent = [0, 0, 1024, 968];
  projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });
  drawInteraction?: Draw;
  snap!: Snap;
  modify!: Modify;
  @Input() selectedMapPoint?: any;
  overlay!: Overlay;
  overlayVisible = false;
  pointType?: MapPointType;

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    if(changes['anchors'] || changes['mapClickMode']) {
      console.log(this.anchors);
      this.loadPoints(anchorMapIconStyle, MapPointType.ANCHOR);
      this.loadOnMapClickOptions(anchorMapIconStyle, MapPointType.ANCHOR);
    }
    if(changes['selectedMapPoint'] && this.selectedMapPoint) {
      const feature = this.source.getFeatureById('anchor_' + this.selectedMapPoint.id);
      const geometry = feature?.getGeometry();
      if(geometry instanceof Point) {
        const pointGeometry = geometry as Point;
        const coordinates = pointGeometry.getCoordinates();
        this.overlay.setPosition(coordinates);
        this.cd.detectChanges();
      }
    }
    if(changes['localizations']) {
      this.loadPoints(localizationMapIconStyle, MapPointType.TAG);
      this.loadOnMapClickOptions(localizationMapIconStyle, MapPointType.TAG);
    }
    this.cd.detectChanges();
  }

  loadMap(): void {
    if(this.map) {
      this.map.dispose();
    }
    this.map = new Map({
      target: 'map',
      view: new View({
        projection: this.projection,
        center: getCenter(this.extent),
        zoom: 2,
        maxZoom: 8,
      }),
    });
    this.loadLayer();
    if(this.drawableLineString) {
      this.loadDrawLineStringOption();
    }
    if(!this.overlay) {
      this.overlay = new Overlay({ element: document.getElementById('popup')!});
    } else {
      this.overlay.setPosition(undefined);
    }
    this.map.addOverlay(this.overlay);
  }

  loadLayer(): void {
    const raster = new TileLayer({
      source: new OSM()
    })
    this.source = new VectorSource();
    const vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: this.vertexBackgroundColor + this.vertexAlfa
        }),
        stroke: new Stroke({
          color: this.vertexColor,
          width: 2
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: this.vertexColor
          })
        })
      })
    });
    const newLayer = [
      new ImageLayer({
        source: new Static({
          url: this.background,
          imageSize: [1000, 1000],
          projection: this.projection,
          imageExtent: this.extent,
        })
      }),
      vector,
      raster
    ];
    setTimeout(() => {this.map.updateSize()});
    this.map.setLayers(newLayer);
    this.map.render();
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

  loadPoints(style: Style, pointType: MapPointType): void {
    this.overlay.setPosition(undefined);
    this.selectedMapPoint = undefined;
    this.source.clear();
    switch(pointType) {
      case 'anchor': {
        if(this.mapClickMode === 'else') {
          this.anchors.forEach((anchor) => {
            const feature = new Feature(new Point([anchor.xPx!, anchor.yPx!]));
            if(anchor.id !== null) {
              feature.setId('anchor_' + anchor.id);
            } else {
              feature.setId('anchor_' + 'NEW')
            }
            feature.setStyle(
              style
            );
            this.source.addFeature(feature);
            this.source.changed();
          });
        }
        break;
      }
      case 'tag': {
        setInterval(() => {
          this.localizations.forEach((localization) => {
            const feature = new Feature(new Point([localization.xPx!, localization.yPx!]));
              if(localization.id !== null) {
                feature.setId('tag_' + localization.id);
              } else {
                feature.setId('tag_' + 'NEW')
              }
              feature.setStyle(
                style
              );
              this.source.addFeature(feature);
              this.source.changed();
          });
        }, 1000);
        break;
      }
    }
  }

  loadDrawOption(): void {
    this.drawInteraction = new Draw({
      source: this.source,
      type: 'Polygon',
      freehandCondition: never,
      style: new Style({
        fill: new Fill({
          color: this.vertexBackgroundColor + this.vertexAlfa
        }),
        stroke: new Stroke({
          color: this.vertexColor,
          width: 2
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: this.vertexColor
          })
        })
      })
    });
    this.map.addInteraction(this.drawInteraction);
    this.snap = new Snap({ source: this.source });
    this.map.addInteraction(this.snap);
  }

  loadDrawLineStringOption(): void {
    this.drawInteraction = new Draw({
      source: this.source,
      type: 'LineString',
      maxPoints: 2,
      style: new Style({
        fill: new Fill({
          color: this.vertexBackgroundColor + this.vertexAlfa
        }),
        stroke: new Stroke({
          color: this.vertexColor,
          width: 2
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: this.vertexColor
          })
        })
      })
    });
    this.drawInteraction.on('drawend', (event) => {
      const length = event.feature.getProperties()['geometry'].getLength();
      this.emitLengthLineString.emit(length);
    })
    this.map.addInteraction(this.drawInteraction);
  }

  loadModifyOption(): void {
    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);
  }

  loadOnMapClickOptions(style: Style, pointType: MapPointType): void {
    this.map.on('click', (event) => {
      switch(pointType) {
        case 'anchor': {
          if(this.mapClickMode === 'add') {
            const existingFeature = this.source.getFeatureById('anchor_NEW');
            if(existingFeature) {
              const newCoordinates = this.map.getCoordinateFromPixel(event.pixel);
              existingFeature.setGeometry(new Point(newCoordinates));
            } else {
              const feature = new Feature(new Point([event.pixel[0], event.pixel[1]]));
              feature.setId('anchor_' + 'NEW')
              feature.setStyle(
                style
              );
              this.source.addFeature(feature);
            }
            this.source.changed();
            const newAnchor: IAnchor = { x: event.pixel[0], y: event.pixel[1]};
            this.selectedMapPoint = newAnchor;
            this.emitNewPoint.emit(this.selectedMapPoint);
        } else {
          if(this.map.getFeaturesAtPixel(event.pixel).length > 0) {
             const id = this.map.getFeaturesAtPixel(event.pixel)[0].getId() as string;
              if(id.startsWith('anchor_')) {
                this.selectedMapPoint = this.anchors.find((anchor) => anchor.id === parseInt(id.split('_')[1], 10));
                this.overlay.setPosition(event.coordinate);
                this.cd.detectChanges();
              } else {
                this.overlay.setPosition(undefined);
              }
            }
          }
          break;
        }
        case 'tag': {
          if(this.map.getFeaturesAtPixel(event.pixel).length > 0) {
            const id = this.map.getFeaturesAtPixel(event.pixel)[0].getId() as string;
             if(id.startsWith('tag_')) {
               this.selectedMapPoint = this.anchors.find((anchor) => anchor.id === parseInt(id.split('_')[1], 10));
               this.overlay.setPosition(event.coordinate);
               this.cd.detectChanges();
             } else {
               this.overlay.setPosition(undefined);
             }
           }
          break;
        }
      }
    });
  }

  onDrawClick(): void {
    this.drawable = !this.drawable;
    if(this.drawable) {
      this.loadDrawOption();
    } else {
      this.clearDrawInteractions();
    }
  }

  onModifyClick(): void {
    this.modified = !this.modified;
    if(this.modified) {
      this.loadModifyOption();
    } else {
      this.clearModifyInteractions();
    }
  }

  saveVertex(): void {
    const feature = this.source.getFeatures()[0];
    const area = this.area;
    if(feature != null) {
      const coordinates = feature.getProperties()['geometry'].getFlatCoordinates();
      const vertexList = chunk(coordinates, 2).map((coord3857: any[], index) => {
        const vertex: NewAreaVertex = { lp: index, x: coord3857[0], y: coord3857[1], area};
        return vertex;
      });
      console.log(vertexList);
    }
  }

  clearVertex(): void {
    if(this.source != null) {
      this.clearDrawInteractions();
      this.clearModifyInteractions();
      this.drawable = false;
      this.modified = false;
      this.source.clear();
    }
  }

  clearDrawInteractions(): void {
    if(this.map != null) {
      this.map.removeInteraction(this.drawInteraction!);
      this.map.removeInteraction(this.snap);
    }
  }

  clearModifyInteractions(): void {
    if(this.map != null) {
      this.map.removeInteraction(this.modify);
    }
  }
}
