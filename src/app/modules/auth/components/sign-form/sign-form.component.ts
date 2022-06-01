import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss'],
})
export class SignFormComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<void>();
  public form: FormGroup;

  constructor(public authService: AuthService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  public register() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (!email) {
      this.authService.registerError('Email is required!');
      return;
    }

    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.sendSignForm.emit(this.form.value);
    }
  }

  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.form.value.password) {
        this.authService.registerError('Password field is empty');
      } else {
        this.authService.registerError('Passwords are not equal');
      }
      setTimeout(() => {
        this.authService.registerError('');
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    const password = this.form.value.password;
    const confirmPassword = this.form.value.confirmPassword;
    return password && password === confirmPassword;
  }
}
