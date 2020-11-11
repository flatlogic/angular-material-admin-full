import { Injectable } from '@angular/core';

const hostApi = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://flatlogic-node-backend.herokuapp.com';
const portApi = process.env.NODE_ENV === 'development' ? 5001 : '';
const baseURLApi = `${hostApi}${portApi ? `:${portApi}/api` : ``}`;
const resourceApi = `${hostApi}${portApi ? `:${portApi}/Resources/` : ``}`;
const tokenRoleField = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const tokenEmailField = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
const tokenSidField = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';

@Injectable()
export class AppConfig {
  config = {
    hostApi,
    portApi,
    baseURLApi,
    resourceApi,
    tokenEmailField,
    tokenRoleField,
    tokenSidField,
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password'
    },
  };

  getConfig(): Object {
    return this.config;
  }
}

