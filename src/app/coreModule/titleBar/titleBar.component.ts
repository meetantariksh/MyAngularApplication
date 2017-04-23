import { Component, OnInit } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Router } from '@angular/router';

import { Auth } from '../service/authentication.service';
import { UserProfile } from '../../beans/userProfile';

@Component(
    {
        selector: 'titleBar',
        templateUrl: 'titleBar.html'
    }
)

export class TitleBar implements OnInit{
    welComeString: string;
    userProfile: UserProfile;
    constructor(
        private auth:Auth,
        private router:Router
    ){}

    public isLoggedOn(): string{
        this.userProfile = this.auth.getUserProfile();
        if(this.userProfile){
            return this.userProfile.lastName+', '+this.userProfile.firstName;
        }else{
            return '';
        }
    }

    public redirectHome(){
        if(this.auth.authenticated()){
            this.router.navigate(['/users']);
        }else{
            this.router.navigate(['/home']);
        }
    }

    ngOnInit(){
        if(this.auth.authenticated() && !this.auth.getUserProfile()){
            this.auth.resetUserProfile();
        }
    }
}