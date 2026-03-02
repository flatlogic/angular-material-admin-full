import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';
import { routes } from '../../../consts';
import { BreadcrumbComponent } from '../../../shared/ui-elements';
import { take } from 'rxjs';

type ChangePasswordFormValue = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      BreadcrumbComponent,
    ]
})
export class ChangePasswordComponent {
  public form: FormGroup<{
    currentPassword: FormControl<string>;
    newPassword: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  public routes: typeof routes = routes;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.form = new FormGroup({
      currentPassword: new FormControl('', { nonNullable: true }),
      newPassword: new FormControl('', { nonNullable: true }),
      confirmPassword: new FormControl('', { nonNullable: true }),
    });
  }

  onChangePassword(): void {
    const payload: ChangePasswordFormValue = this.form.getRawValue();
    this.authService.changePassword(payload).pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully');
        this.router.navigate(['app/dashboard']);
      },
      error: (err) => {
        this.toastr.error(err.error);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['admin/dashboard']);
  }
}
