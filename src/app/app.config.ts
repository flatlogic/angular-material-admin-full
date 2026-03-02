import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export interface AppRuntimeConfig {
  version: string;
  remote: string;
  isBackend: boolean;
  hostApi: string;
  portApi: string;
  baseURLApi: string;
  auth: {
    email: string;
    password: string;
  };
}

const buildRuntimeConfig = (): AppRuntimeConfig => {
  const hostApi = environment.production
    ? 'https://sing-generator-node.herokuapp.com'
    : 'http://localhost';
  const portApi = environment.production ? '' : '8080';
  const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}`;

  return {
    version: '1.2.0',
    remote: 'https://sing-generator-node.herokuapp.com',
    isBackend: environment.backend,
    hostApi,
    portApi,
    baseURLApi,
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password',
    },
  };
};

export const APP_RUNTIME_CONFIG = new InjectionToken<AppRuntimeConfig>(
  'APP_RUNTIME_CONFIG',
  {
    providedIn: 'root',
    factory: buildRuntimeConfig,
  },
);
