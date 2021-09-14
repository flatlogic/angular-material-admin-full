import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthPageComponent } from './containers';
import { AuthRoutingModule } from './auth-routing.module';
import { YearPipe } from './pipes';
import { AuthService, EmailService } from './services';
import { LoginFormComponent, SignFormComponent } from './components';
import { AuthGuard } from './guards';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AuthPageComponent,
    YearPipe,
    LoginFormComponent,
    SignFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    EmailService,
    AuthGuard
  ]
})
export class AuthModule { }
