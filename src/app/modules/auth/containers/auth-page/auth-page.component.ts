import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { routes } from '../../../../consts';
import { LoginFormCreds } from 'src/app/interfaces/LoginFormCreds';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  public sendLoginForm(loginFormCreds: LoginFormCreds): void {
    this._authService.login(loginFormCreds);
  }

  public sendSignForm(): void {
    this._authService.sign();

    this.router.navigate([this.routers.PROFILE]).then();
  }
}
