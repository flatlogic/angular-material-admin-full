import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { routes } from '../../../consts';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  public routes: typeof routes = routes;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  ngOnInit(): void {}

  onChangePassword(): void {
    this.authService.changePassword(this.form.value).subscribe({
      next: (res) => {
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
