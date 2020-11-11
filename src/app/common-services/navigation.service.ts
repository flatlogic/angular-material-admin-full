import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private readonly _defaultPath = [ '/' ];

    constructor(private _router: Router) { }

    public navigateTo(path: string[], navigationExtras?: NavigationExtras): Promise<boolean> {
        let pathToNavigate = [ ...this._defaultPath ];
        
        if (path && path.length > 0) {
            pathToNavigate = [ ...path ];
        }

        if(navigationExtras) {
            return this._router.navigate(path, navigationExtras);
        }

        return this._router.navigate(path);
    }
}