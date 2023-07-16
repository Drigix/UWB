import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UwbSpinnerComponent } from './uwb-spinner.component';

@Directive({ selector: '[uwbSpinner]' })
export class UwbSpinnerDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input() set uwbSpinner(show: boolean) {
    if(show) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent<UwbSpinnerComponent>(UwbSpinnerComponent);
    } else {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
