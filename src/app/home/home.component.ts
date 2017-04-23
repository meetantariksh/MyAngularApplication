import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '../coreModule/service/authentication.service';

@Component(
    {
        moduleId: module.id,
        selector: 'home',
        templateUrl: 'homeComponent.html'
    }
)

export class HomeComponent implements OnInit{
    constructor(private auth: Auth, private router: Router){

    }

    ngOnInit(){
        if(this.auth.authenticated()){
            this.router.navigate(['/users']);
        }
    }
}