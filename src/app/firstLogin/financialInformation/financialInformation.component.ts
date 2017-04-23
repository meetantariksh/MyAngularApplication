import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'financial-information',
    templateUrl: 'financialInformation.html'
})

export class FinancialInformationComponent{
    financilaInformationForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private router: Router){
            this.financilaInformationForm = this.formBuilder.group({
                occupationType: ['',[Validators.required]],
                yearlyIncome: ['',Validators.required],
                monthlyExpenditure: ['', Validators.required],
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
        console.log(control.value);
        if (control && control.dirty) {
                const messages = this.descriptionMessages[field];
                console.log(messages);
                this.formDescriptions[field] += messages[control.value] + ' ';
                console.log(this.formDescriptions[field]);
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

  }
}