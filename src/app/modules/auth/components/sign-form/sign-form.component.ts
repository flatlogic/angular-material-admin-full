import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

type SignFormValue = {
  email: string;
  password: string;
  confirmPassword: string;
};

@Component({
    selector: 'app-sign-form',
    templateUrl: './sign-form.component.html',
    styleUrls: ['./sign-form.component.scss'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatIconModule,
    ]
})
export class SignFormComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<SignFormValue>();
  public form!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(public authService: AuthService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public register(): void {
    const { email } = this.form.getRawValue();

    if (!email) {
      this.authService.registerError('Email is required!');
      return;
    }

    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.sendSignForm.emit(this.form.getRawValue());
    }
  }

  public checkPassword(): void {
    const { password } = this.form.getRawValue();
    if (!this.isPasswordValid()) {
      if (!password) {
        this.authService.registerError('Password field is empty');
      } else {
        this.authService.registerError('Passwords are not equal');
      }
      setTimeout(() => {
        this.authService.registerError('');
      }, 3 * 1000);
    }
  }

  public isPasswordValid(): boolean {
    const { password, confirmPassword } = this.form.getRawValue();
    return password && password === confirmPassword;
  }
}
