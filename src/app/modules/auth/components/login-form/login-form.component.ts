import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../../../../app.config';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<void>();
  public form: FormGroup;
  config: any;

  constructor(appConfig: AppConfig) {
    this.config = appConfig.getConfig();
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.config.auth.email, [Validators.required, Validators.email]),
      password: new FormControl(this.config.auth.password, [Validators.required])
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.sendLoginForm.emit(this.form.value);
    }
  }
}
