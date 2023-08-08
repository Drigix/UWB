import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { Circle, Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { Feature } from 'ol';
import { transform } from 'ol/proj';
import { IAreaVertex, NewAreaVertex } from '@entities/area/area-vertex.model';
import { Polygon } from 'ol/geom';
import { never } from 'ol/events/condition';
import { IArea } from '@entities/area/area.model';
import { chunk } from 'lodash';


@Component({
  selector: 'uwb-map',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMap implements OnChanges {
  @Input() background = '';
  @Input() area?: IArea;
  @Input() vertexes: IAreaVertex[] = [];
  @Input() drawable = false;
  @Input() modified = false;
  @Input() clear = false;
  @Input() vertexAlfa = '66';
  @Input() vertexBackgroundColor = '#8f8f8f';
  @Input() vertexColor = '#ffcc33';
  @Input() disabledMapButtons = false;
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

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['area']) {
      this.vertexBackgroundColor = this.area?.color!;
      this.vertexColor = this.area?.color!;
      this.loadLayer();
    }
    if(changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if(changes['vertexes']) {
      this.loadVertexes();
    }
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
}
