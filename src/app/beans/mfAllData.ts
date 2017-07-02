export class MutualFundsAllData{
    constructor(
        public name: string,
        public scheme_id: number,
        public isin_growth: string,
        public isin_div: string,
        public scheme_group: string,
        public scheme_type: string,
        public amc: string,
        public scode: number,
        public date: string,
        public nav: string,
    ){

   }
}