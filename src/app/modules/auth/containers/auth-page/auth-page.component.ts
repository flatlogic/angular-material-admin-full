import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { routes } from '../../../../consts';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
    this.authService.loginUser({ social: 'google' });
  }
}
