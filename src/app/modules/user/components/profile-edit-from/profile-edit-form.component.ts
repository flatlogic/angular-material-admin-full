import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

type ProfileControls = {
  userName: FormControl<string>;
  userSecondName: FormControl<string>;
  userPhone: FormControl<string>;
  userEmail: FormControl<string>;
  userCountry: FormControl<string>;
  userState: FormControl<string>;
  userCity: FormControl<string>;
  userStreet: FormControl<string>;
};

type CompanyControls = {
  companyName: FormControl<string>;
  companyId: FormControl<string>;
  companyEmail: FormControl<string>;
  companyPhone: FormControl<string>;
};

type SocialControls = {
  facebook: FormControl<string>;
  twitter: FormControl<string>;
  instagram: FormControl<string>;
  github: FormControl<string>;
  codepen: FormControl<string>;
  nik: FormControl<string>;
};

@Component({
    selector: 'app-profile-edit-form',
    templateUrl: './profile-edit-form.component.html',
    styleUrls: ['./profile-edit-form.component.scss'],
    standalone: false
})
export class ProfileEditFormComponent implements OnInit {
  public socialForm!: FormGroup<SocialControls>;
  public companyForm!: FormGroup<CompanyControls>;
  public profileForm!: FormGroup<ProfileControls>;

  public ngOnInit(): void {
    this.profileForm = new FormGroup<ProfileControls>({
      userName: new FormControl('Jane', { nonNullable: true }),
      userSecondName: new FormControl('Jonson', { nonNullable: true }),
      userPhone: new FormControl('1-555-666-7070', { nonNullable: true }),
      userEmail: new FormControl('Jane@gmail.com', { nonNullable: true }),
      userCountry: new FormControl('us', { nonNullable: true }),
      userState: new FormControl('california', { nonNullable: true }),
      userCity: new FormControl('poloAlto', { nonNullable: true }),
      userStreet: new FormControl('1258 Riverside Drive Redding', { nonNullable: true }),
    });

    this.companyForm = new FormGroup<CompanyControls>({
      companyName: new FormControl('Company', { nonNullable: true }),
      companyId: new FormControl('AD1234567891', { nonNullable: true }),
      companyEmail: new FormControl('company@gmail.com', { nonNullable: true }),
      companyPhone: new FormControl('1-353-969-7070', { nonNullable: true }),
    });

    this.socialForm = new FormGroup<SocialControls>({
      facebook: new FormControl('https://www.facebook.com/janejonson', { nonNullable: true }),
      twitter: new FormControl('https://twitter/janejonson', { nonNullable: true }),
      instagram: new FormControl('https://www.instagram.com/janejonson', { nonNullable: true }),
      github: new FormControl('https://github.com/janejonson', { nonNullable: true }),
      codepen: new FormControl('https://codepen.io/janejonson', { nonNullable: true }),
      nik: new FormControl('@janejonson', { nonNullable: true }),
    });
  }

  get userName(): FormControl<string> {
    return this.profileForm.controls.userName;
  }

  get userSecondName(): FormControl<string> {
    return this.profileForm.controls.userSecondName;
  }

  get userPhone(): FormControl<string> {
    return this.profileForm.controls.userPhone;
  }

  get userEmail(): FormControl<string> {
    return this.profileForm.controls.userEmail;
  }

  get userCountry(): FormControl<string> {
    return this.profileForm.controls.userCountry;
  }

  get userState(): FormControl<string> {
    return this.profileForm.controls.userState;
  }

  get userCity(): FormControl<string> {
    return this.profileForm.controls.userCity;
  }

  get userStreet(): FormControl<string> {
    return this.profileForm.controls.userStreet;
  }

  get companyName(): FormControl<string> {
    return this.companyForm.controls.companyName;
  }

  get companyId(): FormControl<string> {
    return this.companyForm.controls.companyId;
  }

  get companyEmail(): FormControl<string> {
    return this.companyForm.controls.companyEmail;
  }

  get companyPhone(): FormControl<string> {
    return this.companyForm.controls.companyPhone;
  }

  get facebook(): FormControl<string> {
    return this.socialForm.controls.facebook;
  }

  get twitter(): FormControl<string> {
    return this.socialForm.controls.twitter;
  }

  get instagram(): FormControl<string> {
    return this.socialForm.controls.instagram;
  }

  get github(): FormControl<string> {
    return this.socialForm.controls.github;
  }

  get codepen(): FormControl<string> {
    return this.socialForm.controls.codepen;
  }

  get nik(): FormControl<string> {
    return this.socialForm.controls.nik;
  }
}
