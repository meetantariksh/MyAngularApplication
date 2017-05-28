export class TaxInformation{
    constructor(
        public istaxApplicable: boolean,
        public taxPercent: number,
        public isSurchageApplicable: boolean,
        public surChanrgePercent: number,
        public cessPercent: number,
        public totalTaxableAmmount: number,
        public actualTaxableAmmount: number,
        public totalTaxPaid: number,
        public surchargeAmmount: number,
        public cessAmmount: number,
        public isScopeOfTaxSavings: boolean,
        public scopeOfTaxSavingsAmmount: number,
        public isProfessionalTaxReq: boolean
    ){

    }
}