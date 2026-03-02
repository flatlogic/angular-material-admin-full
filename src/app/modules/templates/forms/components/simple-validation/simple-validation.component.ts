import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

type SimpleValidationControls = {
  optionA: FormControl<string>;
  optionB: FormControl<string>;
};

@Component({
    selector: 'app-simple-validation',
    templateUrl: './simple-validation.component.html',
    styleUrls: ['./simple-validation.component.scss'],
    standalone: false
})
export class SimpleValidationComponent implements OnInit {
  public form!: FormGroup<SimpleValidationControls>;

  ngOnInit(): void {
    this.form = new FormGroup<SimpleValidationControls>({
      optionA: new FormControl('', { nonNullable: true }),
      optionB: new FormControl('', { nonNullable: true }),
    });
  }

  public validate(): void {
    this.optionA.setValidators([Validators.required]);
    this.optionB.setValidators([Validators.required, Validators.minLength(10)]);
  }

  get optionA(): FormControl<string> {
    return this.form.controls.optionA;
  }

  get optionB(): FormControl<string> {
    return this.form.controls.optionB;
  }
}
