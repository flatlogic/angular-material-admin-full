import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { routes } from '../../../consts';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public routes: typeof routes = routes;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.authService.isAuthenticated()) {
      this.authService.receiveLogin();
    }

    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: { token?: string }) => {
        if (params.token) {
          this.authService.receiveToken(params.token);
        }
      });
  }

  ngOnInit(): void {}
}
