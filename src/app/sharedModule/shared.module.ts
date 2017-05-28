import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AboutUsComponent } from './aboutUs/aboutUs.component';
import { SharedComponent } from './shared.component';
import { SharedRoutes } from './sharedModule.routing';

@NgModule({
  declarations: [
    SharedComponent,
    AboutUsComponent
  ],
  imports: [
      CommonModule,
      SharedRoutes
  ],
  providers:[
    
  ]
})
export class SharedModule { }