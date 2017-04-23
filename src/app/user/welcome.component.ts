import { Component, OnInit } from '@angular/core';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from '../coreModule/service/authentication.service';
import { UserProfile } from '../beans/userProfile';

@Component(
    {
        selector: 'user-welcome',
        templateUrl: 'welcome.html'
    }
)

export class WelcomeComponent{
    userProfile: UserProfile;
    getUserProfile(): UserProfile{
        this.userProfile = this.authenticationService.getUserProfile();
        return this.userProfile;
    }
    constructor(private authenticationService: Auth){
    }
}