import { Component, AfterContentInit } from '@angular/core';
import { AUTH_PROVIDERS, tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Auth } from '../coreModule/service/authentication.service';
import { UserProfile } from '../beans/userProfile';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { backend } from '../props/serverProps';

@Component(
    {
        selector: 'loadUser',
        templateUrl: 'loadUser.html'
    }
)

export class LoadUserComponent implements AfterContentInit{
    userProfile: UserProfile;

    constructor(private router:Router, private authHttp: AuthHttp,
        private http: Http) {
    }

    ngAfterContentInit(){
        this.getUserProfile();
    }

    private getUserProfile(){
        let temp = JSON.parse(localStorage.getItem('UserProfile'));
        this.authHttp
        .get('https://' + 'meetantariksh.auth0.com' + '/api/v2/users/' + temp.user_id).map(response => response.json())
        .subscribe(
            response => {
            this.setUserProfile(response);
            },
            error => console.log(error.json().message)
        );
    }

    private setUserProfile(profile: any){
        this.userProfile = new UserProfile('','','','','','','','','', false,'');
        if(profile.user_metadata){
            this.userProfile.firstName = profile.user_metadata.given_name;
            this.userProfile.lastName = profile.user_metadata.family_name;
            if(profile.user_metadata.email){
                this.userProfile.email = profile.user_metadata.email;
            }
            if(profile.user_metadata.age){
                this.userProfile.age = profile.user_metadata.age
            }
            if(profile.user_metadata.gender){
                this.userProfile.gender = profile.user_metadata.gender;
            }
        }else{
            this.userProfile.firstName = profile.given_name;
            this.userProfile.lastName = profile.family_name;
            if(profile.email){
                this.userProfile.email = profile.email;
            }else{
                this.userProfile.email = '';
            }
            this.userProfile.gender = profile.gender;
        }

        this.userProfile.lastLogin = profile.last_login;
        this.userProfile.numberOfLogins = profile.logins_count;
        this.userProfile.fullUserId = profile.user_id;
        var temp  = (profile.user_id).split('|');
        this.userProfile.userID = temp[1];
        this.userProfile.userImageUrl = profile.picture;
        localStorage.setItem('UserProfile', JSON.stringify(this.userProfile));
        if("1"==this.userProfile.numberOfLogins){
            this.router.navigate(['/userSetup']);
        }else{
            this.checkFinancialInfo(temp[1]);
        }
  }

  private checkFinancialInfo(userID: String){
        var url = backend+'fi/financialInformation/'+userID;
        this.http.get(url).map(response => response.json()).subscribe(
            response => {
                if(null == response){
                    this.router.navigate(['/userSetup']);
                }else if('' == JSON.stringify(response)){
                    this.router.navigate(['/userSetup']);
                }else{
                    this.router.navigate(['/users']);
                }
            }
        );
    }
}
