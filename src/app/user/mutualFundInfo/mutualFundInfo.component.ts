import { Component, OnInit, OnDestroy } from '@angular/core';

import { MutualFundsInfoService } from '../service/mutualFundsInfo.service';

import { MutualFunds } from '../../beans/mutualFunds';
import { NavReturns } from '../../beans/navReturn';
import { MutualFundsAllData } from '../../beans/mfAllData';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component(
    {
        selector: 'mutualFundsInfo',
        templateUrl: 'mutualFundInfo.html'
    }
)
export class MutualFundInfoComponent implements OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
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
            this.fundInfo.getMutualFundSearch(this.fundSearchName)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
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
        this.fundInfo.getMutualFundNav(fund.scheme_id)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
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

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
