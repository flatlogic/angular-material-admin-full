import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { routes } from '../../../consts';
import { BreadcrumbComponent } from '../../../shared/ui-elements';
import { ImageUploaderComponent } from '../../../shared/uploaders/image-uploader/image-uploader.component';
import { take } from 'rxjs';

type AvatarItem = {
  id?: string;
  publicUrl?: string;
  [key: string]: unknown;
};

type ProfileFormControls = {
  id: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string>;
  disabled: FormControl<boolean>;
  avatar: FormControl<AvatarItem[]>;
};

type ProfileFormValue = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
  disabled: boolean;
  avatar: AvatarItem[];
};

@Component({
    selector: '[profile]',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./profile.component.scss'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatRadioModule,
      MatCheckboxModule,
      MatButtonModule,
      BreadcrumbComponent,
      ImageUploaderComponent,
    ]
})
export class ProfileComponent {
  public routes: typeof routes = routes;
  loading = false;
  public form: FormGroup<ProfileFormControls>;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    this.form = new FormGroup<ProfileFormControls>({
      id: new FormControl('', { nonNullable: true }),
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      email: new FormControl({ value: '', disabled: true }, { nonNullable: true }),
      role: new FormControl('user', { nonNullable: true }),
      disabled: new FormControl(false, { nonNullable: true }),
      avatar: new FormControl<AvatarItem[]>([], { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
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
    const currentUser: ProfileFormValue = this.form.getRawValue();
    this.usersService.update(currentUser, currentUser.id).pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
        this.router.navigate([this.routes.DASHBOARD]);
      },
      error: () => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['admin/dashboard']);
  }

  private getCurrentUser(): void {
    this.authService.getCurrentUserInfo().pipe(take(1)).subscribe((res: Partial<ProfileFormValue> | null) => {
      const avatar = Array.isArray(res?.avatar) ? res.avatar : [];
      this.form.patchValue({
        id: res?.id ?? '',
        firstName: res?.firstName ?? '',
        lastName: res?.lastName ?? '',
        phoneNumber: res?.phoneNumber ?? '',
        email: res?.email ?? '',
        role: res?.role ?? 'user',
        disabled: Boolean(res?.disabled),
      });
      this.form.controls.avatar.setValue(avatar);
    });
  }
}
