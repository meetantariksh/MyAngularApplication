import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WelcomeComponent } from './welcome.component';
import { FirstLoginComponent } from './firstLogin/firstLoginWelcom.component';
import { ProfileInfoComponent } from './profileInformation/profileInfo.component';
import { FinancialInformationComponent } from './financialInformation/financialInformation.component';

import { FirstLoginRoutingModule } from './firstLogin.routing';

@NgModule({
  imports: [
    CommonModule,
    FirstLoginRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    WelcomeComponent,
    FirstLoginComponent,
    ProfileInfoComponent,
    FinancialInformationComponent
  ]
})
export class FirstLoginModule {}