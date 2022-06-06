import { Component, OnInit } from '@angular/core';
import { routes } from '../../../consts';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public routes: typeof routes = routes;

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

  ngOnInit(): void {}
}
