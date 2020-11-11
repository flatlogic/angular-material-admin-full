import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../common-services';
import { routes } from '../consts';
import { AuthService } from '../modules/auth/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public routes: typeof routes = routes;
    constructor(
        private _authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // not logged in so redirect to login page with the return url
        if (!window || !window.document || !window.localStorage){
            return true;
        }
        
        const isAuthenticated: boolean = this._authService.isAuthenticated();

        if(!isAuthenticated) {
            this._authService.logout();
        }
        return isAuthenticated;
    }
}