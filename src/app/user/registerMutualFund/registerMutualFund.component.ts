import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MutualFundsInfoService } from '../service/mutualFundsInfo.service';

import { MutualFunds } from '../../beans/mutualFunds';
import { NavReturns } from '../../beans/navReturn';
import { MutualFundsAllData } from '../../beans/mfAllData';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component(
    {
        selector: 'registerMutualFund',
        templateUrl: 'registerMutualFund.html'
    }
)
export class RegisterMutualFunadComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    selectedFund: String = '';
    mfAllData: MutualFundsAllData;
    fund: MutualFunds;
    dataPopulated = false;
    noResult = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: MutualFundsInfoService
    ) {}

    ngOnInit(){
        this.selectedFund = this.route.snapshot.paramMap.get('scode');
        if(this.selectedFund && this.selectedFund !== ''){
            this.service.getMutualFundSearch(this.selectedFund)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                funds =>{
                    if(funds.length == 0){
                        this.noResult = true;
                    }else{
                        this.fund = funds[0];
                        this.service.getMutualFundNav(this.fund.scheme_id)
                        .takeUntil(this.ngUnsubscribe)
                        .subscribe(
                            nav => {
                                this.mfAllData = new MutualFundsAllData(
                                    this.fund.name,
                                    this.fund.scheme_id,
                                    this.fund.isin_growth,
                                    this.fund.isin_div,
                                    this.fund.scheme_group,
                                    this.fund.scheme_type,
                                    this.fund.amc,
                                    nav[0].scode,
                                    nav[0].date,
                                    nav[0].nav
                                    );
                                console.log(JSON.stringify(this.mfAllData));
                                this.dataPopulated = true;
                            }
                        )
                    }
                }
            )
        }else{
            this.router.navigate(['/users/mutualFundInfo']);
        }
    }
    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}