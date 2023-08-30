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
import { Style } from 'ol/style';
import { localizationMapIconStyle } from '@entities/localization/localization-map.style';
import { MapOverlayType } from '@entities/uwb-map/map-options.type';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'uwb-map-localizations-archive',
  templateUrl: './uwb-map.component.html',
  styleUrls: ['./uwb-map.component.scss'],
})
export class UwbMapLocalizationsArchiveComponent extends UwbMap implements OnInit, OnChanges, OnDestroy {
  @Input() localizations: any[] = [];
  localizationArchiveInterval?: NodeJS.Timer;
  currentPointIndex?: number;
  timeToChangePoint = 2;
  isPlay = false;

  constructor(
    protected override cd: ChangeDetectorRef,
    protected override renderer: Renderer2
  ) {
    super(cd, renderer);
  }

  override ngOnInit() {
    this.overlayType = MapOverlayType.TAG;
    this.disabledMapPanelButtons = true;
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['background'] && this.background !== '') {
      this.loadMap();
    }
    if(changes['localizations']) {
      this.source.clear();
      if(this.localizations.length > 0) {
        this.disabledMapPanelButtons = false;
        this.loadPoints(localizationMapIconStyle);
        // this.loadOnMapClickOptions(localizationMapIconStyle);
      } else {
        this.disabledMapPanelButtons = true;
      }
    }
  }

  override ngOnDestroy(): void {
    clearInterval(this.localizationArchiveInterval);
  }

  loadPoints(style: Style): void {
    this.overlay.setPosition(undefined);
    this.selectedMapPoint = undefined;
    const firstLocalization = this.localizations[0];
    this.selectedMapPoint = firstLocalization;
    this.currentPointIndex = 0;
    this.addPointToMap([firstLocalization.xPx!, firstLocalization.yPx],'tag_' + firstLocalization.objectId, style);
    this.setOverlay([firstLocalization.xPx!, firstLocalization.yPx]);
  }


  override goToPreviousPoint(): void {
    this.removePointFromMap('tag_' + this.localizations[this.currentPointIndex!].objectId);
    this.currentPointIndex = (this.currentPointIndex! - 1 < 0) ? this.localizations.length - 1 : this.currentPointIndex! - 1;
    const previousLocalization = this.localizations[this.currentPointIndex!];
    this.selectedMapPoint = previousLocalization;
    this.addPointToMap([previousLocalization.xPx!, previousLocalization.yPx],'tag_' + previousLocalization.objectId, localizationMapIconStyle);
    this.setOverlay([previousLocalization.xPx!, previousLocalization.yPx]);
  }

  override goToNextPoint(): void {
    this.removePointFromMap('tag_' + this.localizations[this.currentPointIndex!].objectId);
    this.currentPointIndex = (this.currentPointIndex! + 1 > this.localizations.length - 1) ? 0 : this.currentPointIndex! + 1;
    const nextLocalization = this.localizations[this.currentPointIndex!];
    this.selectedMapPoint = nextLocalization;
    this.addPointToMap([nextLocalization.xPx!, nextLocalization.yPx],'tag_' + nextLocalization.objectId, localizationMapIconStyle);
    this.setOverlay([nextLocalization.xPx!, nextLocalization.yPx]);
  }

  override goToNextPointAutomatic(): void {
    this.localizationArchiveInterval = setInterval(() => { this.goToNextPoint()}, this.timeToChangePoint * 1000);
  };

  override stopGoToNextPointAutomatic(): void {
    clearInterval(this.localizationArchiveInterval);
    this.localizationArchiveInterval = undefined;
  };

  override onTimeToChangePointChenge(time: number): void {
    this.timeToChangePoint = time;
    if(this.localizationArchiveInterval) {
      clearInterval(this.localizationArchiveInterval);
      this.goToNextPointAutomatic();
    }
  }

  setOverlay(coordinate: Coordinate): void {
    this.overlay.setPosition(coordinate);
    this.cd.detectChanges();
  }
}
