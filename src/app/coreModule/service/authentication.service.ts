
import { Injectable }      from '@angular/core';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UserProfile } from '../../beans/userProfile';
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth{
  userProfile: UserProfile;
  lock = new Auth0Lock('byFqzrqX6KOrsuL3JuSn27U7GZqSreO6', 'meetantariksh.auth0.com', {});

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
        localStorage.setItem('profile', JSON.stringify(profile));
        this.setUserProfile(profile);
      });
    });
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    return tokenNotExpired('id_token');
  }

  public logout() {
    localStorage.removeItem('id_token');
  }

  public getUserProfile():UserProfile{
    return this.userProfile;
  }

  private setUserProfile(profile: any){
    this.userProfile = new UserProfile('','','','','','','','', false,'');
    this.userProfile.firstName = profile.given_name;
    this.userProfile.lastName = profile.family_name;
    this.userProfile.userID = profile.user_id;
    console.log('Login Count: ' + JSON.stringify(profile));
    this.userProfile.userImageUrl = profile.picture;
    if(profile.email){
      this.userProfile.email = profile.email;
    }else{
      this.userProfile.email = '';
    }
    this.userProfile.gender = profile.gender;
    this.setAdditionalUserProfileDetails();
  }

  private setAdditionalUserProfileDetails(){
    this.authHttp
      .get('https://' + 'meetantariksh.auth0.com' + '/api/v2/users/' + this.userProfile.userID).map(response => response.json())
      .subscribe(
        response => {
          this.userProfile.lastLogin = response.last_login;
          this.userProfile.numberOfLogins = response.logins_count;
          console.log(JSON.stringify(response));
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
      .patch('https://' + 'meetantariksh.auth0.com' + '/api/v2/users/' + this.userProfile.userID, data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          console.log('User profile updated to : ' + JSON.stringify(response));
        },
        error => alert(error.json().message)
      );

    console.log('User profile updated');

  }
}