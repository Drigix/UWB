import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic.js';
import Projection from 'ol/proj/Projection.js';
import ImageStatic from 'ol/source/ImageStatic.js';
import { getCenter } from 'ol/extent';
import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

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
  extent = [0, 0, 1024, 968];
  projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });
  staticImageSource!: ImageStatic;
  staticImageLayer!: ImageLayer<ImageStatic>;
  heatmapLayer!: Heatmap;

  constructor() { }

  ngOnInit() {
    this.loadHeatmap();
  }

  ngOnChanges(): void {
    this.loadData();
    this.updateHeatmapLayer();
  }

  loadData(): void {
    const heatMapSource = this.heatmapLayer.getSource() as VectorSource;
    const features = this.data.map((dataPoint: any) => {
      return new Feature({
        geometry: new Point([dataPoint.x, dataPoint.y]),
        weight: dataPoint.weight,
      });
    });
    heatMapSource.addFeatures(features);
  }

  loadHeatmap(): void {
    this.staticImageSource = new Static({
      url: this.background,
      imageSize: [1000, 1000],
      projection: this.projection,
      imageExtent: this.extent,
    });
    this.staticImageLayer = new ImageLayer({ source: this.staticImageSource });
    this.heatmapLayer = this.loadHeatmapOptions();
    this.map = new Map({
      layers: [
        this.staticImageLayer,
        this.heatmapLayer
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

  loadHeatmapOptions(): Heatmap {
    const heatmapData = this.data;
    const heatMapSource = new VectorSource({
      features: heatmapData.map((dataPoint: any) => {
        return new Feature({
          geometry: new Point([dataPoint.x, dataPoint.y]),
        });
      }),
    });
    const heatmapLayer = new Heatmap({
      source: heatMapSource,
      blur: this.pointBlur,
      radius: this.pointRadius,
      opacity: 1,
    });
    return heatmapLayer;
  }

  updateHeatmapLayer(): void {
    if(!this.heatmapLayer) {
      return;
    }
    const updatedHeatmapLayer = this.loadHeatmapOptions();
    this.map.removeLayer(this.heatmapLayer);
    this.heatmapLayer = updatedHeatmapLayer;
    this.map.addLayer(this.heatmapLayer);
    this.map.render();
  }

}
