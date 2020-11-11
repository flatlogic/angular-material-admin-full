import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    public readonly tokenFieldName: string = "token";
    public readonly userFieldName: string = "user";

    checkLocalStorageExistence() {
        if(window && window.localStorage) {
            return true;
        }

        return false;
    }
}