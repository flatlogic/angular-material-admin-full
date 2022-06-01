import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  template: '',
})
export class VerifyEmailComponent {
  constructor(public authService: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.authService.verifyEmail(params.token);
    });
  }
}
