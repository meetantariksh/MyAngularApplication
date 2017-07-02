import { Component, OnInit } from '@angular/core';

import { MutualFundsInfoService } from '../service/mutualFundsInfo.service';

import { MutualFunds } from '../../beans/mutualFunds';
import { NavReturns } from '../../beans/navReturn';
import { MutualFundsAllData } from '../../beans/mfAllData';

@Component(
    {
        selector: 'mutualFundsInfo',
        templateUrl: 'mutualFundInfo.html'
    }
)
export class MutualFundInfoComponent {
    fundSearchName: String = '';
    nameError = false;
    mutualFundsSearchList: MutualFunds[];
    mfAllData: MutualFundsAllData;
    buttonVal = 'Search';
    buttonEnabled = true;
    noResult = false;
    listDisplay = true;
    displayNav = false;
    nameLengthError = false;
    constructor(
     private fundInfo: MutualFundsInfoService){
  
    }

    onSearchClick(){
        this.listDisplay = true;
        this.displayNav = false;
        if('' === this.fundSearchName){
            this.nameError = true;
        }else if(this.fundSearchName.length < 3){
            this.nameLengthError = true;
        }else{
            this.nameLengthError = false;
            this.noResult = false;
            this.buttonVal = 'Please Wait..';
            this.buttonEnabled = false;
            this.nameError = false;
            this.fundInfo.getMutualFundSearch(this.fundSearchName).subscribe(
                funds =>{
                    this.mutualFundsSearchList = funds;
                    this.buttonVal = 'Search';
                    this.buttonEnabled = true;
                    if(funds.length == 0){
                        this.noResult = true;
                    }
                }
            )
        }
    }

    getNav(fund: MutualFunds){
        this.fundInfo.getMutualFundNav(fund.scheme_id).subscribe(
            nav => {
                this.mfAllData = new MutualFundsAllData(
                    fund.name,
                    fund.scheme_id,
                    fund.isin_growth,
                    fund.isin_div,
                    fund.scheme_group,
                    fund.scheme_type,
                    fund.amc,
                    nav[0].scode,
                    nav[0].date,
                    nav[0].nav
                    );
                this.listDisplay = false;
                this.displayNav = true;
            }
        )
    }
}
