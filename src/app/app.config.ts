import { Injectable } from '@angular/core';

const hostApi =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : '';
const portApi = process.env.NODE_ENV === 'development' ? 8080 : '';
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  config = {
    version: '4.0.0',
    remote: '',
    hostApi,
    portApi,
    baseURLApi,
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password',
    },
  };

  constructor() {}

  getConfig(): Object {
    return this.config;
  }
}
