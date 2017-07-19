import { Component, OnInit, OnDestroy } from '@angular/core';

import { NewsService } from '../service/news.service';

import { News } from '../../beans/news';
import { NavReturns } from '../../beans/navReturn';
import { MutualFundsAllData } from '../../beans/mfAllData';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component(
    {
        selector: 'mutualFundsInfo',
        templateUrl: 'news.html'
    }
)
export class NewsComponent implements OnInit, OnDestroy{
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    newsGlobal: News[];
    newsIndia: News[];
    newsBusiness: News[];
    newsTech: News[];
    newsSports: News[];
    newsEntertainment: News[];
    isNewsAvailable = true;
    constructor(
     private newsData: NewsService){
    }

    ngOnInit(){
        this.newsGlobal = new Array<News>();
        this.newsIndia = new Array<News>();
        this.newsBusiness = new Array<News>();
        this.newsTech = new Array<News>();
        this.newsSports = new Array<News>();
        this.newsEntertainment = new Array<News>();
        this.getAllNews();
    }

    getAllNews(){
        this.newsData.getAllNewsGlobal()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            response =>{
                try{
                    this.newsGlobal = response.articles;
                    if(!this.newsGlobal){
                        this.isNewsAvailable = false;
                    }
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsIndia()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            response =>{
                try{
                    this.newsIndia = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsTech()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            response =>{
                try{
                    this.newsTech = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsBusiness()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            response =>{
                try{
                    this.newsBusiness = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsSports()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            response =>{
                try{
                    this.newsSports = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsEntertainment()
        .takeUntil(this.ngUnsubscribe)
        .subscribe(
            response =>{
                try{
                    this.newsEntertainment = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );
    }

    ngOnDestroy(){
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    refreshNews(){
        this.getAllNews();
    }
}
