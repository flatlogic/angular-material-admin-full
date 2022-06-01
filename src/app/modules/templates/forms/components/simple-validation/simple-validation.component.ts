import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-validation',
  templateUrl: './simple-validation.component.html',
  styleUrls: ['./simple-validation.component.scss']
})
export class SimpleValidationComponent implements OnInit {
  public form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      optionA: new FormControl(''),
      optionB: new FormControl('')
    });
  }

  public validate(): void {
    this.optionA.setValidators([Validators.required]);
    this.optionB.setValidators([Validators.required, Validators.minLength(10)]);
  }

  get optionA() {
    return this.form.get('optionA') as FormControl;
  }

  get optionB() {
    return this.form.get('optionB') as FormControl;
  }
}
