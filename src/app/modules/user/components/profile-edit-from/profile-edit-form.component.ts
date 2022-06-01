import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit {
  public socialForm: FormGroup;
  public companyForm: FormGroup;
  public profileForm: FormGroup;

  constructor() {
  }

  public ngOnInit() {
    this.profileForm = new FormGroup({
      userName: new FormControl('Jane'),
      userSecondName: new FormControl('Jonson'),
      userPhone: new FormControl('1-555-666-7070'),
      userEmail: new FormControl('Jane@gmail.com'),
      userCountry: new FormControl('us'),
      userState: new FormControl('california'),
      userCity: new FormControl('poloAlto'),
      userStreet: new FormControl('1258 Riverside Drive Redding')
    });

    this.companyForm = new FormGroup({
      companyName: new FormControl('Company'),
      companyId: new FormControl('AD1234567891'),
      companyEmail: new FormControl('company@gmail.com'),
      companyPhone: new FormControl('1-353-969-7070')
    });

    this.socialForm = new FormGroup({
      facebook: new FormControl('https://www.facebook.com/janejonson'),
      twitter: new FormControl('https://twitter/janejonson'),
      instagram: new FormControl('https://www.instagram.com/janejonson'),
      github: new FormControl('https://github.com/janejonson'),
      codepen: new FormControl('https://codepen.io/janejonson'),
      nik: new FormControl('@janejonson')
    });
  }

  get userName() {
    return this.profileForm.get('userName') as FormControl;
  }

  get userSecondName() {
    return this.profileForm.get('userSecondName') as FormControl;
  }

  get userPhone() {
    return this.profileForm.get('userPhone') as FormControl;
  }

  get userEmail() {
    return this.profileForm.get('userEmail') as FormControl;
  }

  get userCountry() {
    return this.profileForm.get('userCountry') as FormControl;
  }

  get userState() {
    return this.profileForm.get('userState') as FormControl;
  }

  get userCity() {
    return this.profileForm.get('userCity') as FormControl;
  }

  get userStreet() {
    return this.profileForm.get('userStreet') as FormControl;
  }

  get companyName() {
    return this.companyForm.get('companyName') as FormControl;
  }

  get companyId() {
    return this.companyForm.get('companyId') as FormControl;
  }

  get companyEmail() {
    return this.companyForm.get('companyEmail') as FormControl;
  }

  get companyPhone() {
    return this.companyForm.get('companyPhone') as FormControl;
  }

  get facebook() {
    return this.socialForm.get('facebook') as FormControl;
  }

  get twitter() {
    return this.socialForm.get('twitter') as FormControl;
  }

  get instagram() {
    return this.socialForm.get('instagram') as FormControl;
  }

  get github() {
    return this.socialForm.get('github') as FormControl;
  }

  get codepen() {
    return this.socialForm.get('codepen') as FormControl;
  }

  get nik() {
    return this.socialForm.get('nik') as FormControl;
  }
}
