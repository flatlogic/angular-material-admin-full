import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes, AUTO_COMPLETE_LIMIT } from '../../../consts';
import { UsersService } from '../../../shared/services/users.service';
import { take } from 'rxjs';

type AvatarItem = {
  id?: string;
  publicUrl?: string;
  [key: string]: unknown;
};

type UsersCreateFormControls = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string>;
  disabled: FormControl<boolean>;
  avatar: FormControl<AvatarItem[]>;
};

@Component({
    selector: 'app-users-create',
    templateUrl: './users-create.component.html',
    styleUrls: ['./users-create.component.scss'],
    standalone: false
})
export class UsersCreateComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  public form: FormGroup<UsersCreateFormControls>;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private usersService: UsersService,
  ) {
    this.form = new FormGroup<UsersCreateFormControls>({
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      role: new FormControl('user', { nonNullable: true }),
      disabled: new FormControl(false, { nonNullable: true }),
      avatar: new FormControl<AvatarItem[]>([], { nonNullable: true }),
    });
  }

  ngOnInit(): void {}

  public avatarAdd(val: AvatarItem): void {
    const currentAvatar = this.form.controls.avatar.value;
    this.form.controls.avatar.setValue([...currentAvatar, val]);
  }

  public avatarDel(id: string): void {
    const nextAvatar = this.form.controls.avatar.value.filter(
      (img) => img.id !== id,
    );
    this.form.controls.avatar.setValue(nextAvatar);
  }

  onCreate(): void {
    this.usersService.create(this.form.getRawValue()).pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Users created successfully');
        this.router.navigate([this.routes.Users]);
      },
      error: () => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  onCancel(): void {
    this.router.navigate([this.routes.Users]);
  }
}
