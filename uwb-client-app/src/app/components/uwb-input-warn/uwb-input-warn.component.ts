import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'uwb-input-warn',
  templateUrl: './uwb-input-warn.component.html'
})

export class UwbInputWarnComponent implements OnInit {

  @Input() error?: string;
  @Input() minLength?: number;
  @Input() maxLength?: number;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void  {
    if(this.error!) {
      this.error = this.translateService.instant(this.error!);
    } else {
      this.error = this.translateService.instant('global.formInvalid.inputLengthInvalid', { minLength: this.minLength, maxLength: this.maxLength });
    }
  }
}
