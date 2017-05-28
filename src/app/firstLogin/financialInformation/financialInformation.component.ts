import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Http, Headers} from '@angular/http';

import { StaticInvestment } from '../../beans/staticInvestment';
import { PeriodicInvestment } from '../../beans/periodicInvestment';
import { FianacialInformation } from '../../beans/financialInformation';
import { UserProfile } from '../../beans/userProfile';
import { Auth } from '../../coreModule/service/authentication.service';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'financial-information',
    templateUrl: 'financialInformation.html'
})

export class FinancialInformationComponent implements OnInit{
    financilaInformationForm: FormGroup;
    userProfile: UserProfile;
    staticInvestmentL: StaticInvestment[];
    periodicInvestmentL: PeriodicInvestment[];
    financialInformation: FianacialInformation;
    validationErrorMessage: String;
    processing: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private auth: Auth,
        private http: Http){
            this.financilaInformationForm = this.formBuilder.group({
                occupationType: ['',[Validators.required]],
                yearlyIncome: ['',Validators.required],
                monthlyExpenditure: ['', Validators.required],
                investmentsUnder80C: [''],
                isStaticInvestment: ['',Validators.required],
                staticInvestmentList: this.formBuilder.array([]),
                isPeriodicInvestment: ['',Validators.required],
                periodicInvestmentList: this.formBuilder.array([]),

            });
            this.financilaInformationForm.valueChanges
                .subscribe(data => {
                    this.onValueChangedFinancialInformationForm(data);
                    this.onChangeFormDescription(data);
                });
            
            
            this.onValueChangedFinancialInformationForm();
            this.onChangeFormDescription();
    }

    get staticInvestmentList(): FormArray{
        return this.financilaInformationForm.get('staticInvestmentList') as FormArray
    }

    get periodicInvestmentList(): FormArray{
        return this.financilaInformationForm.get('periodicInvestmentList') as FormArray
    }

    addStaticInvestment(){
        this.staticInvestmentList.push(this.formBuilder.group({
            staticInvestmentType: ['', Validators.required],
            staticInvestmentAmmount: ['', Validators.required]
        }));
    }

    addPeriodicInvestment(){
        this.periodicInvestmentList.push(this.formBuilder.group({
            periodicInvestmentType: ['', Validators.required],
            periodicInvestmentAmmount: ['', Validators.required]
        }));
    }

    
    setStaticInvestment() {
        const staticInvestmentFG = this.formBuilder.group({
            staticInvestmentType: ['', Validators.required],
            staticInvestmentAmmount: ['', Validators.required]
        });
        const staticInvestmentFormArray = this.formBuilder.array([staticInvestmentFG]);
        this.financilaInformationForm.setControl('staticInvestmentList', staticInvestmentFormArray);
    }

    setPeriodicInvestment() {
        const periodicInvestmentFG = this.formBuilder.group({
            periodicInvestmentType: ['', Validators.required],
            periodicInvestmentAmmount: ['', Validators.required]
        });
        const periodicInvestmentFormArray = this.formBuilder.array([periodicInvestmentFG]);
        this.financilaInformationForm.setControl('periodicInvestmentList', periodicInvestmentFormArray);
    }


    onValueChangedFinancialInformationForm(data?: any){
        if (!this.financilaInformationForm) { return; }
        const form = this.financilaInformationForm;

        for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onChangeFormDescription(data?: any){
        if (!this.financilaInformationForm) { return; }
        const form = this.financilaInformationForm;

        for (const field in this.formDescriptions) {
        this.formDescriptions[field] = '';
        const control = form.get(field);
        if (control && control.dirty) {
                const messages = this.descriptionMessages[field];
                this.formDescriptions[field] += messages[control.value] + ' ';
            }
        }
    }

    formDescriptions = {
        'occupationType': ''
    }

    descriptionMessages = {
        'occupationType': {
            'Profession':      'A person may not be an expert in every field. So, we require services of others who fire specialised in one held or the other. For example, we need the services of doctors for our                       treatment, lawyers to get legal support etc. They are all engaged in profession. Thus, profession refers to an occupation, which requires specialised knowledge and training to                           pursue it.',
            'Employment':      'Employment refers to an occupation in which a person works regularly for others and get wage/salary in return. Government servants, company executives, bank officials, factory                             workers are all said to be in employment.',
            'Business':      'Business refers to an occupation in which goods and services are produced, sold and exchanged in return for money. It is carried out on a regular basis with the prime objective of                       making profit. Mining, manufacturing, trading, transporting, storing, banking, and insurance are examples of business activities.',
        }
    }

    formErrors = {
        'occupationType': '',
        'yearlyIncome': '',
        'monthlyExpenditure': '',
        'isStaticInvestment': '',
        'isPeriodicInvestment': '',
        'staticInvestmentType': '',
        'staticInvestmentAmmount': '',
        'periodicInvestmentType': '',
        'periodicInvestmentAmmount': ''
    };

      validationMessages = {
        'occupationType': {
            'required':      'Occupation Type is required.'
        },
        'yearlyIncome': {
            'required':      'Yearly Income is required.'
        },
        'monthlyExpenditure': {
            'required':      'An approximate Monthly Expenditure is required.',
        },
        'isStaticInvestment': {
            'required':      'Please let us know if you have any Static investments made.'
        },

        'isPeriodicInvestment': {
            'required':      'Please let us know if you have any Periodic investments made.'
        },
        'staticInvestmentType': {
            'required':      'Investment Type is required.'
        },
        'staticInvestmentAmmount': {
            'required':      'Investment Ammount is required.',
        },
        'periodicInvestmentType': {
            'required':      'Investment Type is required.'
        },
        'periodicInvestmentAmmount': {
            'required':      'Investment Ammount is required.'
        }
  };

  onSubmit(){
    this.processing = true;
    var validationMonthly;
    var validationPeriodic = 0;
    this.financialInformation = new FianacialInformation('','',0,0,true,true);
    this.staticInvestmentL = new Array<StaticInvestment>();
    this.periodicInvestmentL = new Array<PeriodicInvestment>();
    const financialInfoForm = this.financilaInformationForm.value;
    this.financialInformation.occupationType = financialInfoForm.occupationType;
    this.financialInformation.monthlyExpenditure = financialInfoForm.monthlyExpenditure;
    this.financialInformation.yearlyIncome  = financialInfoForm.yearlyIncome;
    if(financialInfoForm.investmentsUnder80C){
        this.financialInformation.investmentsUnder80C = financialInfoForm.investmentsUnder80C;
    }else{
        this.financialInformation.investmentsUnder80C = 0;
    }
    validationMonthly = (financialInfoForm.yearlyIncome)/12;
    this.financialInformation.isPeriodicInvestment = financialInfoForm.isPeriodicInvestment;
    this.financialInformation.isStaticInvestment = financialInfoForm.isStaticInvestment;
    if(financialInfoForm.isPeriodicInvestment){
        if(financialInfoForm.periodicInvestmentList){
            for(let prInvest of financialInfoForm.periodicInvestmentList){
                this.periodicInvestmentL.push(new PeriodicInvestment(prInvest.periodicInvestmentType, prInvest.periodicInvestmentAmmount));
                validationPeriodic = +validationPeriodic + +prInvest.periodicInvestmentAmmount;
            }
             this.financialInformation.periodicInvestmentList = this.periodicInvestmentL;
        }
    }
    if(financialInfoForm.isStaticInvestment){
        if(financialInfoForm.staticInvestmentList){
            for(let stInvest of financialInfoForm.staticInvestmentList){
                this.staticInvestmentL.push(new StaticInvestment(stInvest.staticInvestmentType, stInvest.staticInvestmentAmmount));
            }
             this.financialInformation.staticInvestmentList = this.staticInvestmentL;
        }
    }
    this.financialInformation.userId = this.userProfile.userID;
    if(validationMonthly<financialInfoForm.monthlyExpenditure){
        this.validationErrorMessage = "Your Montly Expenditure cannot be greater than your monthly income.";
        this.processing = false;
    }else if(validationMonthly<(+financialInfoForm.monthlyExpenditure + +validationPeriodic)){
        this.validationErrorMessage = "Summation of your periodic investments and monthly expenditure cannot be greater than your monthly income.";
        this.processing = false;
    }else if(financialInfoForm.yearlyIncome<(+(financialInfoForm.monthlyExpenditure*12) + +(validationPeriodic*12) +        +financialInfoForm.investmentsUnder80C)){
        this.validationErrorMessage = "Summation of your investment, investments under 80 C and expenditure cannot be greater than your yearly income.";
        this.processing = false;
    }else{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:3500/fi/financialInformation', JSON.stringify(this.financialInformation), {headers: headers})
            .toPromise()
            .then(res => {
                if(200 == res.status){
                    this.router.navigate(['/users']);
                }
            })
            .catch();
    }
  }

  ngOnInit(){
    this.userProfile = this.auth.getUserProfile();
  }
}