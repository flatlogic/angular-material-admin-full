import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  RouterModule,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { CrudModule } from './modules/CRUD/crud.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './shared/services/http-interceptor.service';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NotFoundComponent,
    CrudModule,
    BrowserAnimationsModule,
    RouterModule,
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: {
        hideSingleSelectionIndicator: true,
        panelWidth: null,
      },
    },
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([httpInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
