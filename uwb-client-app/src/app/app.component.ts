import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'uwb-client-app';
  constructor(private translateService: TranslateService){
  }

  async ngOnInit(): Promise<void> {
    this.translateService.setDefaultLang('pl');
    this.translateService.use('pl');
  }
}
