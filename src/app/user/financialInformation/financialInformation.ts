import { Component, OnInit } from '@angular/core';

import { Auth } from '../../coreModule/service/authentication.service';
import { FinancialInformationService } from '../service/financialInfo.service';
import { UserProfile } from '../../beans/userProfile';
import { FianacialInformation } from '../../beans/financialInformation';
import { StaticInvestment } from '../../beans/staticInvestment';
import { PeriodicInvestment } from '../../beans/periodicInvestment';
import { TaxInformation } from '../../beans/taxInformation';

@Component(
    {
        selector: 'financialInformation',
        templateUrl: 'financialInformation.html'
    }
)

export class FinancialInformationComponent implements OnInit{
    userProfile: UserProfile;
    financialInformation: FianacialInformation;
    staticInvestments:StaticInvestment[];
    periodicInvestments: PeriodicInvestment[];
    taxInfoBeforeTaxsavings: TaxInformation;
    taxInfoAfterTaxsavings: TaxInformation;

    totalSavingsPerMonth: number = 0;
    monthlyIncome: number = 0;
    leftAsset: number = 0;
    taxPerMonth: number = 0;
    taxdifference: number = 0;

    totalSavingsPerMonthPercentage: number = 0;
    leftAssetPercentage: number = 0;
    expenditurePercentage: number = 0;
    incomePerMonthAfterTax: number = 0;

    pieChartLabels:string[] = ['Total Savings/Month', 'Expenditure/Month', 'Accumulating Liquid Asset/Month', 'Tax Paid/Month'];
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

    pieChartOptionsTaxInfo:any = {
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
            text: 'Your Current Asset Allocation'
        }
    }

    pieChartDataTaxInfoAfterSavings:number[];
    pieChartOptionsTaxInfoAfterSavings:any = {
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
            text: 'Your Asset Allocation After Tax Savings'
        }
    }

    pieChartLabelsTotalYearlySavings:string[];
    pieChartDataTotalYearlySavings:number[];
    pieChartTypeTotalYearlySavings:string = 'pie';
    pieChartOptionsTotalYearlySavings:any = {
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
            text: 'Financial Summary'
        }
    }

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
    polarAreaChartType:string = 'polarArea';
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

    radarChartLabelsOptimum: string[] = ['Savings', 'Expenditure', 'Liquid Asset'];
    radarChartDataOptimum: any;
    radarChartTypeOptimum: string = 'radar'

    radarChartLabelsBullish: string[] = ['Savings', 'Expenditure', 'Liquid Asset'];
    radarChartDataBullish: any;
    radarChartTypeBullish: string = 'radar'

    constructor(private authenticationService: Auth,
    private financialInfo: FinancialInformationService){
  
    } 

    loadFinancialInformation(){
        this.financialInfo.getFinancialInfo(this.userProfile.userID)
                .subscribe(financialInformation => {
                    
                    this.monthlyIncome = (+financialInformation.yearlyIncome/12);

                    for(let i=0; i<financialInformation.periodicInvestmentList.length; i++){
                        if(this.doughnutChartLabels){
                            this.doughnutChartLabels.push(financialInformation.periodicInvestmentList[i].periodicInvestmentType);
                            this.doughnutChartData.push(financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount);

                             this.pieChartLabelsTotalYearlySavings.push(financialInformation.periodicInvestmentList[i].periodicInvestmentType);
                            this.pieChartDataTotalYearlySavings.push(financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount*12);


                            this.totalSavingsPerMonth = this.totalSavingsPerMonth + financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount;
                        }else{
                            this.doughnutChartLabels = new Array<string>();
                            this.doughnutChartData = new Array<number>();

                            this.pieChartLabelsTotalYearlySavings = new Array<string>();
                            this.pieChartDataTotalYearlySavings = new Array<number>();

                            this.doughnutChartLabels.push(financialInformation.periodicInvestmentList[i].periodicInvestmentType);
                            this.doughnutChartData.push(financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount);

                            this.pieChartLabelsTotalYearlySavings.push(financialInformation.periodicInvestmentList[i].periodicInvestmentType);
                            this.pieChartDataTotalYearlySavings.push(financialInformation.periodicInvestmentList[i].periodicInvestmentAmmount*12);


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

                     this.leftAsset = ((+financialInformation.yearlyIncome/12) - +(+this.totalSavingsPerMonth +                  +financialInformation.monthlyExpenditure));

                    this.taxInfoBeforeTaxsavings = this.financialInfo.getTaxInformation(financialInformation,                                           this.userProfile);
                    if(this.taxInfoBeforeTaxsavings.istaxApplicable && this.taxInfoBeforeTaxsavings.isScopeOfTaxSavings){
                        let newFinanInfo = financialInformation;
                        let originalInvestmentUnder80C =  financialInformation.investmentsUnder80C;
                        newFinanInfo.investmentsUnder80C = 150000;
                        this.taxInfoAfterTaxsavings = this.financialInfo.getTaxInformation(newFinanInfo,                                           this.userProfile);
                        financialInformation.investmentsUnder80C = originalInvestmentUnder80C;
                    }

                    if(this.taxInfoBeforeTaxsavings.istaxApplicable){
                        this.taxPerMonth = +this.taxInfoBeforeTaxsavings.totalTaxPaid/12;
                        this.leftAsset = +this.leftAsset - +this.taxPerMonth;
                    }

                    this.pieChartData = [this.totalSavingsPerMonth, financialInformation.monthlyExpenditure, this.leftAsset, this.taxPerMonth];

                    if(this.pieChartLabelsTotalYearlySavings){
                        this.pieChartLabelsTotalYearlySavings.push("Total Accumulating Liquid Asset");
                        this.pieChartDataTotalYearlySavings.push(this.leftAsset*12);
                    }else{
                        this.pieChartLabelsTotalYearlySavings = new Array<string>();
                        this.pieChartDataTotalYearlySavings = new Array<number>();

                        this.pieChartLabelsTotalYearlySavings.push("Total Accumulating Liquid Asset");
                        this.pieChartDataTotalYearlySavings.push(this.leftAsset*12);
                    }
                    if(financialInformation.investmentsUnder80C){
                        this.pieChartLabelsTotalYearlySavings.push("Investments Under 80 C");
                        this.pieChartDataTotalYearlySavings.push(financialInformation.investmentsUnder80C);
                    }

                    this.incomePerMonthAfterTax = +this.monthlyIncome - +this.taxPerMonth;
                    this.totalSavingsPerMonthPercentage = (+this.totalSavingsPerMonth/+this.incomePerMonthAfterTax)*100;
                    this.leftAssetPercentage = (+this.leftAsset/+this.incomePerMonthAfterTax)*100;
                    this.expenditurePercentage = (+financialInformation.monthlyExpenditure/+this.incomePerMonthAfterTax)*100;

                    this.radarChartDataOptimum = [
                        {
                            data: [
                                +this.totalSavingsPerMonthPercentage - +30,
                                +this.expenditurePercentage - +50,
                                +this.leftAssetPercentage - +20,
                            ],
                            label:'Your Savings'
                        }
                    ];

                    this.radarChartDataBullish = [
                        {
                            data: [
                                +this.totalSavingsPerMonthPercentage - +50,
                                +this.expenditurePercentage - +40,
                                +this.leftAssetPercentage - +10,
                            ],
                            label:'Your Savings'
                        }
                    ];

                    this.taxdifference = +this.taxInfoBeforeTaxsavings.totalTaxPaid - +this.taxInfoAfterTaxsavings.totalTaxPaid;

                    this.pieChartDataTaxInfoAfterSavings = [this.totalSavingsPerMonth, financialInformation.monthlyExpenditure, +this.leftAsset + +(+this.taxdifference/12), +this.taxPerMonth - +(+this.taxdifference/12)];


                    this.staticInvestments = financialInformation.staticInvestmentList;
                    this.periodicInvestments = financialInformation.periodicInvestmentList;
                    this.financialInformation = financialInformation;
                });
    }

    loadUserProfile(){
        this.userProfile = this.authenticationService.getUserProfile();
    }

    ngOnInit(){
        this.loadUserProfile();
        this.loadFinancialInformation();
    } 

}