import { Component } from '@angular/core';

import { UserProfile } from '../../beans/userProfile';
import { Auth } from '../../coreModule/service/authentication.service';

@Component(
    {
        selector: 'user-sideBar',
        templateUrl: 'sidebar.html',
    }
)

export class UserSideBar{
    userProfile: UserProfile;
    getUserProfile(): UserProfile{
        this.userProfile = this.authenticationService.getUserProfile();
        return this.userProfile;
    }
    constructor(private authenticationService: Auth){
    }
}