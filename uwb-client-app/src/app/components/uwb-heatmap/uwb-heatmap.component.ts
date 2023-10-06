import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic.js';
import Projection from 'ol/proj/Projection.js';
import { getCenter } from 'ol/extent';
import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'uwb-heatmap',
  templateUrl: './uwb-heatmap.component.html',
  styleUrls: ['./uwb-heatmap.component.scss']
})

export class UwbHeatmapComponent implements OnInit, OnChanges {
  @Input() background = '';
  @Input() pointBlur = 15;
  @Input() pointRadius = 10;
  @Input() data: any[] = [];
  map!: Map;
  source!: VectorSource<Point>;
  extent = [0, 0, 1024, 968];
  projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });
  heatmapLayer!: Heatmap;

  constructor() { }

  ngOnInit() {
    this.loadHeatmap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['background']) {
      this.loadHeatmap();
    }
    if(changes['data']) {
      this.loadData();
    }
  }

  loadData(): void {
    this.source.clear();
    this.data.forEach( d => {
      const feature = new Feature(
        new Point([d.xPx, d.yPx])
      );
      this.source.addFeature(feature);
      this.source.changed();
    });
  }

  loadHeatmap(): void {
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
    this.source = new VectorSource({});
    this.heatmapLayer = new Heatmap({
      source: this.source,
      blur: this.pointBlur,
      radius: this.pointRadius,
      opacity: 1,
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
      this.heatmapLayer,
      raster
    ];
    setTimeout(() => {this.map.updateSize()});
    this.map.setLayers(newLayer);
    this.map.render();
  }

  onHeatmapSettingsChange(): void {
    this.heatmapLayer.setRadius(this.pointRadius);
    this.heatmapLayer.setBlur(this.pointBlur);
    this.heatmapLayer.changed();
  }

}
