import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error/error404.component';

import { ApplicationRoutes } from './appRouting/routing.component';
import { ErrorRoutes } from './error/errorRouting.component';

import { CoreModule } from './coreModule/core.module';

import { AuthGuard } from './security/authGaurd.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ApplicationRoutes,
    //Keep this at last.
    ErrorRoutes
  ],
  providers:[
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
