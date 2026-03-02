import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

type SettingsEditControls = {
  lang: FormControl<string>;
};

@Component({
    selector: 'app-settings-edit-form',
    templateUrl: './settings-edit-form.component.html',
    styleUrls: ['./settings-edit-form.component.scss'],
    standalone: false
})
export class SettingsEditFormComponent implements OnInit {
  public settingForm!: FormGroup<SettingsEditControls>;

  constructor() {
  }

  public ngOnInit() {
    this.settingForm = new FormGroup<SettingsEditControls>({
      lang: new FormControl('eng', { nonNullable: true }),
    });
  }

  get lang(): FormControl<string> {
    return this.settingForm.controls.lang;
  }
}
