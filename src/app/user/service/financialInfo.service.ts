import { Injectable, OnInit }      from '@angular/core';
import { Http } from '@angular/http';

import { FianacialInformation } from '../../beans/financialInformation';
import { StaticInvestment } from '../../beans/staticInvestment';
import { PeriodicInvestment } from '../../beans/periodicInvestment';
import { TaxInformation } from '../../beans/taxInformation';
import { UserProfile } from '../../beans/userProfile';
import { Auth } from '../../coreModule/service/authentication.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { backend } from '../../props/serverProps';

@Injectable()
export class FinancialInformationService{
    financialInfo: FianacialInformation;
    staticInvestment:StaticInvestment;
    periodicInvestment: PeriodicInvestment;
    constructor(private authenticationService: Auth,
    private http: Http){
    }

    getFinancialInfo(userID: String): Observable<FianacialInformation>{
        var url = backend+'fi/financialInformation/'+userID;
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getTaxInformation(financialInformation: FianacialInformation,  uProfile: UserProfile): TaxInformation{
         var taxInfo = this.getTaxSlabInformation(financialInformation, uProfile);
         var totalTaxableIncome;
         if(financialInformation.investmentsUnder80C && 0 != financialInformation.investmentsUnder80C){
            totalTaxableIncome = +financialInformation.yearlyIncome - +financialInformation.investmentsUnder80C;
         }else{
            totalTaxableIncome = financialInformation.yearlyIncome;
         }
         if(taxInfo && taxInfo.istaxApplicable){
            taxInfo.totalTaxPaid = (+totalTaxableIncome/100 * +taxInfo.taxPercent); 
            if(taxInfo.isSurchageApplicable){
               taxInfo.surchargeAmmount =  +(+totalTaxableIncome/100 * +taxInfo.surChanrgePercent);
               taxInfo.totalTaxPaid = +taxInfo.totalTaxPaid + +taxInfo.surchargeAmmount;
            }
            taxInfo.cessAmmount = +taxInfo.totalTaxPaid/100 * +taxInfo.cessPercent;
            taxInfo.totalTaxPaid = +taxInfo.totalTaxPaid + +taxInfo.cessAmmount;
            taxInfo.actualTaxableAmmount = totalTaxableIncome;
            taxInfo.totalTaxableAmmount = +financialInformation.yearlyIncome;
            taxInfo = this.getScopeOfTaxSavings(financialInformation, taxInfo);
         }
         return taxInfo;
    }

    private getScopeOfTaxSavings(financialInformation: FianacialInformation, taxInfo: TaxInformation): TaxInformation{
        if(taxInfo && taxInfo.istaxApplicable){
            if(financialInformation.investmentsUnder80C < 150000){
                taxInfo.isScopeOfTaxSavings = true;
                taxInfo.scopeOfTaxSavingsAmmount = 150000 - financialInformation.investmentsUnder80C;
            }else{
                taxInfo.isScopeOfTaxSavings = false;
            }
        }
        return taxInfo;
    }

    private getTaxSlabInformation(financialInformation: FianacialInformation, uProfile: UserProfile): TaxInformation{
        var taxInfo = new TaxInformation(true, 0, true, 0, 0, 0, 0, 0, 0, 0, true, 0, true);
        var totalTaxableIncome;
        if(financialInformation.investmentsUnder80C && 0 != financialInformation.investmentsUnder80C){
            totalTaxableIncome = +financialInformation.yearlyIncome - +financialInformation.investmentsUnder80C;
        }else{
            totalTaxableIncome = financialInformation.yearlyIncome;
        }
        if(+uProfile.age > 80){
            if(totalTaxableIncome > 500000){
                if(totalTaxableIncome > 1000000){
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 30;
                    taxInfo.cessPercent = 3;
                    if(totalTaxableIncome >= 10000000){
                        taxInfo.isSurchageApplicable = true;
                        taxInfo.surChanrgePercent = 15;
                    }else{
                        taxInfo.isSurchageApplicable = false;
                    }

                }else{
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 20;
                    taxInfo.cessPercent = 3;
                    taxInfo.isSurchageApplicable = false;
                }
            }else{
                taxInfo.istaxApplicable = false;
            }

        }else if(+uProfile.age > 60){
            if(totalTaxableIncome > 300000){
                if(totalTaxableIncome < 500000){
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 5;
                    taxInfo.cessPercent = 3;
                    taxInfo.isSurchageApplicable = false;
                }else if(totalTaxableIncome > 1000000){
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 30;
                    taxInfo.cessPercent = 3;
                    if(totalTaxableIncome >= 10000000){
                        taxInfo.isSurchageApplicable = true;
                        taxInfo.surChanrgePercent = 15;
                    }else if(totalTaxableIncome >= 5000000){
                        taxInfo.isSurchageApplicable = true;
                        taxInfo.surChanrgePercent = 10;
                    }else{
                        taxInfo.isSurchageApplicable = false;
                    }

                }else{
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 20;
                    taxInfo.cessPercent = 3;
                    taxInfo.isSurchageApplicable = false;
                }
            }else{
                taxInfo.istaxApplicable = false;
            }

        }else{
            if(totalTaxableIncome > 250000){
                if(totalTaxableIncome < 500000){
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 5;
                    taxInfo.cessPercent = 3;
                    taxInfo.isSurchageApplicable = false;
                }else if(totalTaxableIncome > 1000000){
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 30;
                    taxInfo.cessPercent = 3;
                    if(totalTaxableIncome >= 10000000){
                        taxInfo.isSurchageApplicable = true;
                        taxInfo.surChanrgePercent = 15;
                    }else if(totalTaxableIncome >= 5000000){
                        taxInfo.isSurchageApplicable = true;
                        taxInfo.surChanrgePercent = 10;
                    }else{
                        taxInfo.isSurchageApplicable = false;
                    }

                }else{
                    taxInfo.istaxApplicable = true;
                    taxInfo.taxPercent = 20;
                    taxInfo.cessPercent = 3;
                    taxInfo.isSurchageApplicable = false;
                }
            }else{
                taxInfo.istaxApplicable = false;
            }
        }

        if(financialInformation.occupationType === 'Profession'){
            taxInfo.isProfessionalTaxReq = true;
        }else{
            taxInfo.isProfessionalTaxReq = false;
        }

        return taxInfo;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

