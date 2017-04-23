import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../security/authGaurd.component';

import { WelcomeComponent } from './welcome.component';
import { FirstLoginComponent } from './firstLogin/firstLoginWelcom.component';
import { ProfileInfoComponent } from './profileInformation/profileInfo.component';
import { FinancialInformationComponent } from './financialInformation/financialInformation.component';

const firstLoginRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FirstLoginComponent,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'profileInformation',
        component: ProfileInfoComponent,
        canActivateChild: [AuthGuard],
      },
      {
        path: 'financialInformation',
        component: FinancialInformationComponent,
        canActivateChild: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(firstLoginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FirstLoginRoutingModule {}