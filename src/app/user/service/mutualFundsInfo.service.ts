import { Injectable, OnInit }      from '@angular/core';
import { Http } from '@angular/http';

import { MutualFunds } from '../../beans/mutualFunds';
import { NavReturns } from '../../beans/navReturn';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { backend } from '../../props/serverProps';

@Injectable()
export class MutualFundsInfoService{
    constructor(
    private http: Http){
    }
    getMutualFundSearch(searchString: String): Observable<MutualFunds[]>{
        var url = backend+'mf/searchMF/'+searchString;
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getMutualFundNav(searchString: number): Observable<NavReturns>{
        var url = backend+'mf/getNAV/'+searchString;
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }
}