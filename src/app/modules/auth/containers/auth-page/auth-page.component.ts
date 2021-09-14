import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.authService.receiveLogin();
    }

    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        this.authService.receiveToken(params.token);
      }
    });
  }

  public sendLoginForm(creds: any): void {
    this.authService.loginUser(creds);
  }

  public sendSignForm(creds: any): void {
    this.authService.registerUser(creds);
  }

  public googleLogin() {
    this.authService.loginUser({social: 'google'});
  }
}
