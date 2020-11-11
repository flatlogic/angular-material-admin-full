import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from 'src/app/app.config';
import { LoginFormCreds } from 'src/app/interfaces/LoginFormCreds';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<LoginFormCreds>();
  config: any;
  public form: FormGroup;
  public flatlogicEmail = '';
  public flatlogicPassword = '';

  constructor(private _appConfig: AppConfig, private _authService: AuthService) {
    this.config = this._appConfig.getConfig();
    this.flatlogicEmail = this.config.auth.email;
    this.flatlogicPassword = this.config.auth.password;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.flatlogicEmail, [Validators.required, Validators.email]),
      password: new FormControl(this.flatlogicPassword, [Validators.required])
    });
  }

  public login(): void {
    const creds: LoginFormCreds = {
      email: this.flatlogicEmail,
      password: this.flatlogicPassword
    }
    if (this.form.valid) {
      this._authService.login(creds);
    }
  }
}
