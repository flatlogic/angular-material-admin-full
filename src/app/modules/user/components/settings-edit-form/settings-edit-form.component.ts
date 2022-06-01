import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings-edit-form',
  templateUrl: './settings-edit-form.component.html',
  styleUrls: ['./settings-edit-form.component.scss']
})
export class SettingsEditFormComponent implements OnInit {
  public settingForm: FormGroup;

  constructor() {
  }

  public ngOnInit() {
    this.settingForm = new FormGroup({
      lang: new FormControl('eng'),
    });
  }

  get lang() {
    return this.settingForm.get('lang') as FormControl;
  }
}
