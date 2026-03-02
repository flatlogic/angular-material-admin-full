import { Component, DestroyRef, inject } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-verify-email',
    template: '',
    standalone: true
})
export class VerifyEmailComponent {
  private readonly destroyRef = inject(DestroyRef);

  constructor(public authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: { token?: string }) => {
        if (params.token) {
          this.authService.verifyEmail(params.token);
        }
      });
  }
}
