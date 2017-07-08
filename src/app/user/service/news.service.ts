import { Injectable, OnInit }      from '@angular/core';
import { Http } from '@angular/http';

import { News } from '../../beans/news';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { backend } from '../../props/serverProps';

@Injectable()
export class NewsService{
    constructor(
    private http: Http){
    }
    getAllNewsGlobal(): Observable<any>{
        var url = backend+'news/getNews/Global';
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getAllNewsIndia(): Observable<any>{
        var url = backend+'news/getNews/India';
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getAllNewsBusiness(): Observable<any>{
        var url = backend+'news/getNews/Business';
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getAllNewsTech(): Observable<any>{
        var url = backend+'news/getNews/Tech';
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getAllNewsSports(): Observable<any>{
        var url = backend+'news/getNews/Sports';
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

    getAllNewsEntertainment(): Observable<any>{
        var url = backend+'news/getNews/Entertainment';
        this.http.get(url).map(response => response.json());
        return this.http.get(url).map(response => response.json());
    }

}