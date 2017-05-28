import { Component, OnInit } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from '../../coreModule/service/authentication.service';
import { UserProfile } from '../../beans/userProfile';

@Component(
    {
        selector: 'user-profile',
        templateUrl: 'profile.html'
    }
)

export class UserProfileComponent implements OnInit{
    userProfile: UserProfile;
    constructor(private authenticationService: Auth){
    }

    ngOnInit(){
        this.userProfile = this.authenticationService.getUserProfile();
    }
}