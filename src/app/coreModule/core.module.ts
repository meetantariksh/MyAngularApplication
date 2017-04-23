import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions, HttpModule } from '@angular/http';

import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';

import { TitleBar } from './titleBar/titleBar.component'; 
import { Footer } from './footer/footer.componet';

import { Auth } from './service/authentication.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
  }), http, options);
}

@NgModule({
  declarations: [
    TitleBar,
    Footer,
  ],
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    TitleBar,
    Footer,
  ],
  providers: [
    Auth,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
  ],
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. This module is to be loaded in the ROOT MODULE ONLY.');
    }
  }
  static forRoot(): ModuleWithProviders{
    return{
      ngModule: CoreModule,
      providers: [Auth]
    }
  }
 }
