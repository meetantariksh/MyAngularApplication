import { Component, OnInit, OnDestroy } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from '../../coreModule/service/authentication.service';
import { FinancialInformationService } from '../service/financialInfo.service';
import { UserProfile } from '../../beans/userProfile';
import { FianacialInformation } from '../../beans/financialInformation';
import { StaticInvestment } from '../../beans/staticInvestment';
import { PeriodicInvestment } from '../../beans/periodicInvestment';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component(
    {
        selector: 'user-home',
        templateUrl: 'userHome.html'
    }
)

export class UserHomeComponent implements OnInit, OnDestroy{ //implements OnInit
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    userProfile: UserProfile;
    financialInformation: FianacialInformation;
    staticInvestment:StaticInvestment;
    periodicInvestment: PeriodicInvestment;

    doughnutChartLabels:string[];
    doughnutChartData:number[];
    doughnutChartType:string = 'doughnut';
    doughnutChartOptions:any = {
        responsive: true,
        maintainAspectRation: false,
        responsiveAnimationDuration: 2000,
        animation: {
            easing: 'easeInBounce'
        },
        hover: {
            mode: 'nearest',
            animationDuration: 600
        },
        title: {
            display: true,
            fullWidth: true,
            fontSize: 20,
            fontStyle: 'bold',
            text: 'Periodic Investment Summary'
        }
    }

    polarAreaChartLabels:string[];
    polarAreaChartData:number[];
    polarAreaLegend:boolean = true;
    polarAreaChartOptions:any = {
        responsive: true,
        maintainAspectRation: false,
        responsiveAnimationDuration: 2000,
        animation: {
            easing: 'easeInBounce'
        },
        hover: {
            mode: 'nearest',
            animationDuration: 600
        },
        title: {
            display: true,
            fullWidth: true,
            fontSize: 20,
            fontStyle: 'bold',
            text: 'Static Investment Summary'
        }
    }
 
    polarAreaChartType:string = 'polarArea';

    totalSavingsPerMonth: number = 0;

    pieChartLabels:string[] = ['Total Savings/Month', 'Expenditure/Month', 'Accumulating Liquid Asset/Month'];
    pieChartData:number[];
    pieChartType:string = 'pie';
    pieChartOptions:any = {
        responsive: true,
        maintainAspectRation: false,
        responsiveAnimationDuration: 2000,
        animation: {
            easing: 'easeInBounce'
        },
        hover: {
            mode: 'nearest',
            animationDuration: 600
        },
        title: {
            display: true,
            fullWidth: true,
            fontSize: 25,
            fontStyle: 'bold',
            text: 'Financial Summary'
        }
    }
 
    leftAsset: number = 0;
    // events
    public chartClicked(e:any):void {
        console.log(e);
    }
    
    public chartHovered(e:any):void {
        console.log(e);
    }

    getUserProfile(): UserProfile{
        this.userProfile = this.authenticationService.getUserProfile();
        return this.userProfile;
    }
    constructor(private authenticationService: Auth,
    private financialInfo: FinancialInformationService){
  
    } 

    getFinancialInfo(): FianacialInformation{
       this.financialInfo.getFinancialInfo(this.userProfile.userID)
                .takeUntil(this.ngUnsubscribe)
                .subscribe(financialInformation => {
                    this.financialInformation = financialInformation;
                    for(let i=0; i<financialInformation.periodicInvestmentList.length; i++){
                        if(this.doughnutChartLabels){
                            this.doughnutChartLabels.push(financialInformation.periodicInvestmentList[i].periodicInvestmentType);
                            this.doughnutChartData.push(financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount);
                            this.totalSavingsPerMonth = this.totalSavingsPerMonth + financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount;
                        }else{
                            this.doughnutChartLabels = new Array<string>();
                            this.doughnutChartData = new Array<number>();

                            this.doughnutChartLabels.push(financialInformation.periodicInvestmentList[i].periodicInvestmentType);
                            this.doughnutChartData.push(financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount);
                            this.totalSavingsPerMonth = this.totalSavingsPerMonth + financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount;
                        }
                    }
                    for(let i=0; i<financialInformation.staticInvestmentList.length; i++){
                        if(this.polarAreaChartLabels){
                            this.polarAreaChartLabels.push(financialInformation.staticInvestmentList[i].staticInvestmentType);
                            this.polarAreaChartData.push(financialInformation.staticInvestmentList[i].staticInvestmentAmmount);
                        }else{
                            this.polarAreaChartLabels = new Array<string>();
                            this.polarAreaChartData = new Array<number>();

                            this.polarAreaChartLabels.push(financialInformation.staticInvestmentList[i].staticInvestmentType);
                            this.polarAreaChartData.push(financialInformation.staticInvestmentList[i].staticInvestmentAmmount);
                        }
                    }
                    this.leftAsset = ((+financialInformation.yearlyIncome/12) - +(+this.totalSavingsPerMonth + +financialInformation.monthlyExpenditure));
                    this.pieChartData = [this.totalSavingsPerMonth, financialInformation.monthlyExpenditure, this.leftAsset];
                });
       return this.financialInformation;
    }

    ngOnInit(){
        this.userProfile = JSON.parse(localStorage.getItem('UserProfile'));
        this.getFinancialInfo();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    } 

}