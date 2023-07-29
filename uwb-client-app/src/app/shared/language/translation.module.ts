import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { missingTranslationHandler, translatePartialLoader } from '@config/translation.config';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: translatePartialLoader,
    //     deps: [HttpClient]
    //   },
    //   missingTranslationHandler: {
    //     provide: MissingTranslationHandler,
    //     useFactory: missingTranslationHandler
    //   }
    // }),
    TranslateModule.forRoot({
      loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
      }
    }),
  ],
  exports: [],
  providers: [],
})
export class TranslationModule {
  constructor(private translateService: TranslateService){
    translateService.setDefaultLang('pl');
    translateService.use('pl');
  }
}
