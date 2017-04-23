import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { Auth } from '../coreModule/service/authentication.service';
 
@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
 
    constructor(private router: Router, private auth: Auth) { }
 
    canActivate(): boolean {
        if (localStorage.getItem('id_token')) {
            if(this.auth.authenticated()){
                return true;
            }else{
                this.router.navigate(['/home']);
                return false;
            }
        }else{
            this.router.navigate(['/home']);
            return false;
        }
    }

    canActivateChild(): boolean {
        return this.canActivate();
    }

    canLoad(route: Route): boolean {
        if (localStorage.getItem('id_token')) {
            return true;
        }else{
            this.router.navigate(['/home']);
            return false;
        }
    }
}