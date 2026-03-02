import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes, AUTO_COMPLETE_LIMIT } from '../../../consts';
import { UsersService } from '../../../shared/services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

type AvatarItem = {
  id?: string;
  publicUrl?: string;
  [key: string]: unknown;
};

type UsersEditFormControls = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string>;
  disabled: FormControl<boolean>;
  avatar: FormControl<AvatarItem[]>;
  password: FormControl<string>;
};

type UsersEditFormValue = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  disabled: boolean;
  avatar: AvatarItem[];
  password: string;
};

@Component({
    selector: 'app-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss'],
    standalone: false
})
export class UsersEditComponent implements OnInit {
  loading = false;
  public routes: typeof routes = routes;
  public form: FormGroup<UsersEditFormControls>;
  AUTO_COMPLETE_LIMIT = AUTO_COMPLETE_LIMIT;
  selectedId: string | null = null;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private usersService: UsersService,
  ) {
    this.form = new FormGroup<UsersEditFormControls>({
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      role: new FormControl('user', { nonNullable: true }),
      disabled: new FormControl(false, { nonNullable: true }),
      avatar: new FormControl<AvatarItem[]>([], { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.selectedId = params.get('id');

        if (this.selectedId) {
          this.getUsersById();
          return;
        }

        this.redirectToFirstUser();
      });
  }

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

  onSave(): void {
    if (!this.selectedId) {
      this.toastr.error('User is not selected');
      this.router.navigate([this.routes.Users]);
      return;
    }

    const payload: UsersEditFormValue = this.form.getRawValue();
    this.usersService.update(payload, this.selectedId).pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Users updated successfully');
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

  private getUsersById(): void {
    if (!this.selectedId) {
      return;
    }

    this.usersService.getById(this.selectedId).pipe(take(1)).subscribe({
      next: (res) => {
        if (!res) {
          this.toastr.error('User not found');
          this.router.navigate([this.routes.Users]);
          return;
        }

        this.form.patchValue({
          firstName: res.firstName ?? '',
          lastName: res.lastName ?? '',
          phoneNumber: res.phoneNumber ?? '',
          email: res.email ?? '',
          role: typeof res.role === 'string' ? res.role : 'user',
          disabled: Boolean(res.disabled),
          password: res.password ?? '',
        });
        this.form.controls.avatar.setValue(
          Array.isArray(res.avatar) ? (res.avatar as AvatarItem[]) : [],
        );
      },
      error: () => {
        this.toastr.error('Failed to load user');
        this.router.navigate([this.routes.Users]);
      },
    });
  }

  private redirectToFirstUser(): void {
    this.usersService.getAll().pipe(take(1)).subscribe({
      next: (res) => {
        const firstUserId = res?.rows?.[0]?.id;
        if (!firstUserId) {
          this.toastr.error('No users available for editing');
          this.router.navigate([this.routes.Users]);
          return;
        }

        this.router.navigate([this.routes.Users_EDIT, firstUserId], {
          replaceUrl: true,
        });
      },
      error: () => {
        this.toastr.error('Failed to load users');
        this.router.navigate([this.routes.Users]);
      },
    });
  }
}
