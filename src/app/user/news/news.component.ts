import { Component, OnInit } from '@angular/core';

import { NewsService } from '../service/news.service';

import { News } from '../../beans/news';
import { NavReturns } from '../../beans/navReturn';
import { MutualFundsAllData } from '../../beans/mfAllData';

@Component(
    {
        selector: 'mutualFundsInfo',
        templateUrl: 'news.html'
    }
)
export class NewsComponent implements OnInit{
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
        this.newsData.getAllNewsGlobal().subscribe(
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

        this.newsData.getAllNewsIndia().subscribe(
            response =>{
                try{
                    this.newsIndia = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsTech().subscribe(
            response =>{
                try{
                    this.newsTech = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsBusiness().subscribe(
            response =>{
                try{
                    this.newsBusiness = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsSports().subscribe(
            response =>{
                try{
                    this.newsSports = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );

        this.newsData.getAllNewsEntertainment().subscribe(
            response =>{
                try{
                    this.newsEntertainment = response.articles;
                }catch(e){
                    this.isNewsAvailable = false;
                }
            }
        );
    }

    refreshNews(){
        this.getAllNews();
    }
}
