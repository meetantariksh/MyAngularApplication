import { PeriodicInvestment } from './periodicInvestment';
import { StaticInvestment } from './staticInvestment';

export class FianacialInformation{
    constructor(
        public userId: string,
        public occupationType: string,
        public yearlyIncome: number,
        public monthlyExpenditure: number,
        public isStaticInvestment: boolean,
        public isPeriodicInvestment: boolean,
        public staticInvestmentList?: StaticInvestment[] ,
        public periodicInvestmentList?: PeriodicInvestment[],
        public investmentsUnder80C?: number
    ){

    }
}