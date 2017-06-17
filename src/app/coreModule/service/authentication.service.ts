
import { Injectable }      from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UserProfile } from '../../beans/userProfile';
let Auth0Lock = require('auth0-lock').default;

var options = {
  theme: {
        logo: '../../../assets/images/logo.png',
        primaryColor: '#317eac',
    },
    languageDictionary: {
      title: "Lets Begin.."
    },
};

@Injectable()
export class Auth{
  userProfile: UserProfile;
  lock = new Auth0Lock('byFqzrqX6KOrsuL3JuSn27U7GZqSreO6', 'meetantariksh.auth0.com', options);
  constructor(private router:Router, private authHttp: AuthHttp) {
    this.lock.on("authenticated", (authResult) => {
      if(localStorage.getItem('id_token')){
        localStorage.removeItem('id_token');
      }
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error:any, profile:any) => {
        if(error){
          throw new error;
        }
        localStorage.setItem('UserProfile', JSON.stringify(profile));
        this.router.navigate(['/load']);
        //this.setUserProfile(profile);
      });
    });
  }

  public login() {
    this.router.navigate(['/home']);
    this.lock.show();
  }

  public authenticated() {
    return tokenNotExpired('id_token');
  }

  public logout() {
    localStorage.removeItem('id_token');
  }

  public getUserProfile():UserProfile{
    if(this.userProfile){
      return this.userProfile;
   }else{
      this.userProfile = JSON.parse(localStorage.getItem('UserProfile'));
      return this.userProfile;
    } 
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
    
    this.userProfile.fullUserId = profile.user_id;
    var temp  = (profile.user_id).split('|');
    this.userProfile.userID = temp[1];
    this.userProfile.userImageUrl = profile.picture;
    this.setAdditionalUserProfileDetails();
  }

  private setAdditionalUserProfileDetails(){
    this.authHttp
      .get('https://' + 'meetantariksh.auth0.com' + '/api/v2/users/' + this.userProfile.fullUserId).map(response => response.json())
      .subscribe(
        response => {
          console.log(response);
          this.userProfile.lastLogin = response.last_login;
          this.userProfile.numberOfLogins = response.logins_count;
          localStorage.setItem('UserProfile', JSON.stringify(this.userProfile));
          if("1"==this.userProfile.numberOfLogins){
            this.router.navigate(['/userSetup']);
          }else{
            this.router.navigate(['/users']);
          }
        },
        error => console.log(error.json().message)
      );
  }

  public resetUserProfile(){
    if(this.authenticated() && localStorage.getItem('id_token')){
      this.lock.getProfile(localStorage.getItem('id_token'), (error:any, profile:any) => {
        if(error){
          throw new error;
        }
        this.setUserProfile(profile);
      });
    }else{
      console.log('ERROR ENCOUNTERD..');
    }
  }

  public updateUserProfile(newProfile: UserProfile){
    this.userProfile = newProfile;

    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    var data: any = JSON.stringify({
      user_metadata: {
        given_name: newProfile.firstName,
        family_name: newProfile.lastName,
        email: newProfile.email,
        gender: newProfile.gender,
        age: newProfile.age
      }
    });

    this.authHttp
      .patch('https://' + 'meetantariksh.auth0.com' + '/api/v2/users/' + this.userProfile.fullUserId, data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          localStorage.setItem('UserProfile', JSON.stringify(this.userProfile));
        },
        error => alert(error.json().message)
      );
  }
}