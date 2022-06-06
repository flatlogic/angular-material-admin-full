import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { routes } from '../../../consts';

@Component({
  selector: '[profile]',
  templateUrl: './profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public routes: typeof routes = routes;
  currentUser;
  loading = false;
  form: FormGroup;

  imgFile: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dataFormatterService: DataFormatterService,

    private authService: AuthService,
    private usersService: UsersService,
  ) {
    this.form = this.formBuilder.group({
      id: [''],

      firstName: [''],

      lastName: [''],

      phoneNumber: [''],

      email: [{ value: '', disabled: true }],

      role: [false],

      disabled: [false],

      avatar: [[]],
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  avatarAdd(val) {
    this.form.value.avatar.push(val);
  }
  avatarDel(id) {
    this.form.value.avatar = this.form.value.avatar.filter(
      (img) => img.id !== id,
    );
  }

  onSave(): void {
    const currentUser = this.form.value;
    if (this.form.controls.email) {
      currentUser.email = this.form.controls.email.value;
    }
    this.usersService.update(currentUser, currentUser.id).subscribe({
      next: (res) => {
        this.toastr.success('Profile updated successfully');
        this.router.navigate([this.routes.DASHBOARD]);
      },
      error: (err) => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['admin/dashboard']);
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUserInfo().subscribe((res) => {
      this.form.patchValue(res);
    });
  }
}
