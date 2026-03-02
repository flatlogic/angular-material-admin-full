import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../../../app.config';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

type LoginFormValue = {
  email: string;
  password: string;
};

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule]
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<LoginFormValue>();
  public form!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  public email: string;
  public password: string;

  constructor(@Inject(APP_RUNTIME_CONFIG) appConfig: AppRuntimeConfig) {
    this.email = appConfig.auth.email;
    this.password = appConfig.auth.password;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.email, {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(this.password, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.sendLoginForm.emit(this.form.getRawValue());
    }
  }
}
