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

export class UserProfileComponent{
    userProfile: UserProfile;
    getUserProfile(): UserProfile{
        this.userProfile = this.authenticationService.getUserProfile();
        return this.userProfile;
    }
    constructor(private authenticationService: Auth){
    }
}