import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../security/authGaurd.component';

import { WelcomeComponent } from './welcome.component';
import { UserHomeComponent } from './userHome/userHome.component';
import { UserProfileComponent } from './profile/profile.component'; 
import { CapitalMarketComponent } from './capitalMarket/capitalMarket.component';
import { FinancialInformationComponent } from './financialInformation/financialInformation';
import { MutualFundsComponent } from './mutualFunds/mutualFunds.components';
import { InsuranceComponent } from './insurance/insurance.component';
import { GovernmentBondComponent } from './governmentBonds/governmentBonds.component';
import { StockMarketComponent } from './stockMarket/stockMarket.component';

const userRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserHomeComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'capitalMarket',
        component: CapitalMarketComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'financialInformation',
        component: FinancialInformationComponent,
        canActivateChild: [AuthGuard]
      },
       {
        path: 'stockMarket',
        component: StockMarketComponent,
        canActivateChild: [AuthGuard]
      },
       {
        path: 'governmentBonds',
        component: GovernmentBondComponent,
        canActivateChild: [AuthGuard]
      },
       {
        path: 'insurance',
        component: InsuranceComponent,
        canActivateChild: [AuthGuard]
      },
       {
        path: 'mutualFunds',
        component: MutualFundsComponent,
        canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}