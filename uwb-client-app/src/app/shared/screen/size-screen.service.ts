import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SizeScreenService {

  sizeScreen = 0;
  smallScreen = false;
  mobileScreen = false;
  isMobile = false;

  sizeScreenSubject = new BehaviorSubject<number>(0);
  sizeScreen$ = this.sizeScreenSubject.asObservable();

  smallScreenSubject = new BehaviorSubject<boolean>(false);
  smallScreen$ = this.smallScreenSubject.asObservable();

  mobileScreenSubject = new BehaviorSubject<boolean>(false);
  mobileScreen$ = this.mobileScreenSubject.asObservable();

  constructor() {
    this.isMobile = this.checkIfMobile();
    this.sizeScreen = window.innerWidth;
    this.smallScreen = window.innerWidth < 1100;
    this.mobileScreen = window.innerWidth < 700;

    this.sizeScreenSubject.next(this.sizeScreen);
    this.smallScreenSubject.next(this.smallScreen);
    this.mobileScreenSubject.next(this.mobileScreen);
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }

  onWindowResize(): void {
    this.sizeScreen = window.innerWidth;
    this.smallScreen = window.innerWidth < 1100;
    this.mobileScreen = window.innerWidth < 700;

    this.sizeScreenSubject.next(this.sizeScreen);
    this.smallScreenSubject.next(this.smallScreen);
    this.mobileScreenSubject.next(this.mobileScreen);
  }

  checkIsMobile(): boolean {
    return this.isMobile;
  }

  private checkIfMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
