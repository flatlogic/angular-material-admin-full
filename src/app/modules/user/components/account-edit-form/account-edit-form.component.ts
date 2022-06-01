import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-account-edit-form',
  templateUrl: './account-edit-form.component.html',
  styleUrls: ['./account-edit-form.component.scss']
})
export class AccountEditFormComponent implements OnInit {
  public editForm: FormGroup;

  constructor() {
  }

  public ngOnInit() {
    this.editForm = new FormGroup({
      userName: new FormControl('user'),
      userEmail: new FormControl('user@mail.com'),
      userStatus: new FormControl('admin'),
    });
  }

  get userName() {
    return this.editForm.get('userName') as FormControl;
  }

  get userEmail() {
    return this.editForm.get('userEmail') as FormControl;
  }

  get userStatus() {
    return this.editForm.get('userStatus') as FormControl;
  }
}
