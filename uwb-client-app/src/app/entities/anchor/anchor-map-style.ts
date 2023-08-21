import { Fill, Icon, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";

export const anchorMapIconStyle = new Style({
  image: new Icon({
    src: '../../../assets/images/anchor.png',  // Ścieżka do niestandardowego obrazu
    scale: 0.07,  // Skala obrazu
    anchor: [0.5, 1],  // Punkt kotwiczenia (0.5, 1 oznacza środek dolnej krawędzi)
  }),
  zIndex: 100
});

export const anchorMapStyle = new Style({
    fill: new Fill({
      color: '#ff0000'
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ff0000'
      }),
    }),
    zIndex: 100
});
