import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../../../../app.config';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<any>();
  public form: FormGroup;
  public email: string;
  public password: string;

  constructor(appConfig: AppConfig) {
    const config: any = appConfig.getConfig();
    const creds = config.auth;
    this.email = creds.email;
    this.password = creds.password;
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.password, [Validators.required]),
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.sendLoginForm.emit(this.form.value);
    }
  }
}
