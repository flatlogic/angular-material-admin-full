import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

type AccountEditControls = {
  userName: FormControl<string>;
  userEmail: FormControl<string>;
  userStatus: FormControl<string>;
};

@Component({
    selector: 'app-account-edit-form',
    templateUrl: './account-edit-form.component.html',
    styleUrls: ['./account-edit-form.component.scss'],
    standalone: false
})
export class AccountEditFormComponent implements OnInit {
  public editForm!: FormGroup<AccountEditControls>;

  constructor() {
  }

  public ngOnInit() {
    this.editForm = new FormGroup<AccountEditControls>({
      userName: new FormControl('user', { nonNullable: true }),
      userEmail: new FormControl('user@mail.com', { nonNullable: true }),
      userStatus: new FormControl('admin', { nonNullable: true }),
    });
  }

  get userName(): FormControl<string> {
    return this.editForm.controls.userName;
  }

  get userEmail(): FormControl<string> {
    return this.editForm.controls.userEmail;
  }

  get userStatus(): FormControl<string> {
    return this.editForm.controls.userStatus;
  }
}
