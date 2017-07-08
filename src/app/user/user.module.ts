import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { WelcomeComponent } from './welcome.component';
import { UserSideBar } from './sidebar/sidebar.component';
import { UserHomeComponent } from './userHome/userHome.component';
import { UserProfileComponent } from './profile/profile.component';
import { CapitalMarketComponent } from './capitalMarket/capitalMarket.component';
import { FinancialInformationComponent } from './financialInformation/financialInformation';
import { MutualFundsComponent } from './mutualFunds/mutualFunds.components';
import { InsuranceComponent } from './insurance/insurance.component';
import { GovernmentBondComponent } from './governmentBonds/governmentBonds.component';
import { StockMarketComponent } from './stockMarket/stockMarket.component';
import { MutualFundInfoComponent } from './mutualFundInfo/mutualFundInfo.component';
import { NewsComponent } from './news/news.component';

import { FinancialInformationService } from './service/financialInfo.service'; 
import { MutualFundsInfoService } from './service/mutualFundsInfo.service'; 
import { NewsService } from './service/news.service'; 

import { UserRoutingModule }       from './user.routing';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    UserRoutingModule
  ],
  providers: [
    FinancialInformationService,
    MutualFundsInfoService,
    NewsService
  ],
  declarations: [
    WelcomeComponent,
    UserSideBar,
    UserHomeComponent,
    UserProfileComponent,
    CapitalMarketComponent,
    FinancialInformationComponent,
    MutualFundsComponent,
    InsuranceComponent,
    GovernmentBondComponent,
    StockMarketComponent,
    MutualFundInfoComponent,
    NewsComponent
  ]
})
export class UserModule {}