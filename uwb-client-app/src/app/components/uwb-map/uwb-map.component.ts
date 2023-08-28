import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
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
import { MapDisplayType, MapOverlayType } from '@entities/uwb-map/map-options.type';
import { Coordinate } from 'ol/coordinate';


@Component({
  selector: 'uwb-map',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMap implements OnInit, OnChanges, OnDestroy {
  /*INPUT DATA*/
  @Input() background = '';
  @Input() area?: IArea;
  @Input() vertexes: IAreaVertex[] = [];
  @Input() anchors: IAnchor[] = [];
  // @Input() localizations: any[] = [];
  /*BUTTONS OPTION*/
  @Input() drawable = false;
  @Input() drawableLineString = false;
  @Input() modified = false;
  @Input() clear = false;
  /*INPUT STYLES */
  @Input() vertexAlfa = '66';
  @Input() vertexBackgroundColor = '#8f8f8f';
  @Input() vertexColor = '#ffcc33';
  @Input() mapDisplayType: MapDisplayType = 'normal';
  @Input() mapWithButtons = false;
  @Input() disabledMapButtons = false;
  @Input() styleClass = 'h-full';
  @Input() selectedMapPoint?: any;
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
  overlay!: Overlay;
  overlayType?: MapOverlayType;
  mapInterval?: NodeJS.Timer;
  disabledMapPanelButtons = false;

  constructor(protected cd: ChangeDetectorRef, protected renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['background'] && this.background !== '') {
      this.loadMap();
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if(this.mapInterval) {
      clearInterval(this.mapInterval);
    }
    this.map.setTarget(undefined);
    this.map.dispose();
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

  addPointToMap(coordinate: Coordinate, id: string | number, style: Style): void {
    const feature = new Feature(new Point(coordinate));
    feature.setId(id);
    feature.setStyle(style);
    this.source.addFeature(feature);
    this.source.changed();
  }

  removePointFromMap(id: string | number): void {
    const existPoint = this.source.getFeatureById(id);
    if(existPoint) {
      this.source.removeFeature(existPoint);
      this.source.changed();
    }
  }

  goToPreviousPoint(): void {};

  goToNextPoint(): void {};

  goToNextPointAutomatic(): void {};

  stopGoToNextPointAutomatic(): void {};

  onTimeToChangePointChenge(time: number): void {};
}
