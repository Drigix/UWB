import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
import { Draw } from 'ol/interaction';
import ImageStatic from 'ol/source/ImageStatic.js';
import { Circle, Stroke } from 'ol/style';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import { Feature } from 'ol';
import { transform } from 'ol/proj';

@Component({
  selector: 'uwb-map',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMap implements OnInit, OnChanges {
  @Input() background = '';
  @Input() drawable = false;
  map!: Map;
  extent = [0, 0, 1024, 968];
  projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });
  staticImageSource!: ImageStatic;
  staticImageLayer!: ImageLayer<ImageStatic>;
  drawInteraction?: Draw;

  ngOnInit(): void {
    this.loadMap();
    this.addCircle();
  }

  ngOnChanges(): void {
    this.drawable ? this.loadDrawOption() : this.map.removeInteraction(this.drawInteraction!);
  }

  loadMap(): void {
    this.staticImageSource = new Static({
      url: this.background,
      imageSize: [1000, 1000],
      projection: this.projection,
      imageExtent: this.extent,
    });
    this.staticImageLayer = new ImageLayer({ source: this.staticImageSource });

    this.map = new Map({
      layers: [
        this.staticImageLayer,
      ],
      target: 'map',
      view: new View({
        projection: this.projection,
        center: getCenter(this.extent),
        zoom: 2,
        maxZoom: 8,
      }),
    });
  }

  loadDrawOption(): void {
    const drawSource = new VectorSource({ wrapX: false });
    const drawLayer = new VectorLayer({
      source: drawSource,
    });
    this.drawInteraction = new Draw({ source: drawSource, type: 'Polygon', freehand: false });
    this.map.addInteraction(this.drawInteraction);
    this.map.addLayer(drawLayer);
  }

  addCircle(): void {
    const point = new Circle({
      radius: 5,
      fill: new Fill({color: 'rgb(0,0,255)'}),
      stroke: new Stroke ({ width: 2, color: 'rgb(255,0,0)' }),

    });
    const drawSource = new VectorSource({ features: [new Feature(point)] });
    const style = new Style({
      fill: new Fill({ color: 'rgb(255,0,0)'}),
      stroke: new Stroke({ width: 2, color: 'rgb(255,0,0)'}),
      image: new Circle({
        radius: 5,
        fill: new Fill({color: 'rgb(0,0,255)'}),
        stroke: new Stroke ({ width: 2, color: 'rgb(255,0,0)' })
      })
    });
    const drawLayer = new VectorLayer({
      source: drawSource,
      style: style
    });

    this.map.addLayer(drawLayer);
  }
}
