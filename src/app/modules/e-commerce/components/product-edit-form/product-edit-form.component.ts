import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {routes} from '../../../../consts';
import {ProductDetails} from '../../models/product-details';
import {FormControl, FormGroup, Validators} from '@angular/forms';

type ProductEditFormControls = {
  image: FormControl<string>;
  title: FormControl<string>;
  subtitle: FormControl<string>;
  price: FormControl<string>;
  discount: FormControl<string>;
  description1: FormControl<string>;
  description2: FormControl<string>;
  code: FormControl<string>;
  hashtag: FormControl<string>;
  technology: FormControl<string | string[]>;
  rating: FormControl<string>;
  status: FormControl<string>;
};

@Component({
    selector: 'app-product-edit-form',
    templateUrl: './product-edit-form.component.html',
    styleUrls: ['./product-edit-form.component.scss'],
    standalone: false
})
export class ProductEditFormComponent implements OnInit {
  @Input() product: ProductDetails;
  @Output() editProduct: EventEmitter<ProductDetails> = new EventEmitter<ProductDetails>();
  public router: typeof routes = routes;
  public form: FormGroup<ProductEditFormControls>;

  selected = 'option';

  constructor() {
    this.form = new FormGroup<ProductEditFormControls>({
      image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      subtitle: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      discount: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description1: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      description2: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      code: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      hashtag: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      technology: new FormControl<string | string[]>('', { nonNullable: true, validators: [Validators.required] }),
      rating: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      status: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.image.setValue('option');
      this.title.setValue(this.product.title);
      this.subtitle.setValue(this.product.subtitle);
      this.price.setValue(this.product.price);
      this.discount.setValue(this.product.discount);
      this.description1.setValue(this.product.description1);
      this.description2.setValue(this.product.description2);
      this.code.setValue(this.product.code);
      this.hashtag.setValue(this.product.hashtag);
      this.technology.setValue(this.product.technology);
      this.rating.setValue(this.product.rating);
      this.status.setValue(this.product.status);
    }
  }

  public save(): void {
    const values = this.form.getRawValue();
    this.editProduct.emit({
      id: this.id,
      image: values.image,
      title: values.title,
      subtitle: values.subtitle,
      price: values.price,
      discount: values.discount,
      description1: values.description1,
      description2: values.description2,
      code: values.code,
      hashtag: values.hashtag,
      technology: Array.isArray(values.technology)
        ? values.technology
        : values.technology
        ? [values.technology]
        : [],
      rating: values.rating,
      status: values.status,
    })
  }

  get id() {
    return this.product && this.product.id ? this.product.id : '77';
  }

  get image(): FormControl<string> {
    return this.form.controls.image;
  }

  get title(): FormControl<string> {
    return this.form.controls.title;
  }

  get subtitle(): FormControl<string> {
    return this.form.controls.subtitle;
  }

  get price(): FormControl<string> {
    return this.form.controls.price;
  }

  get discount(): FormControl<string> {
    return this.form.controls.discount;
  }

  get description1(): FormControl<string> {
    return this.form.controls.description1;
  }

  get description2(): FormControl<string> {
    return this.form.controls.description2;
  }

  get code(): FormControl<string> {
    return this.form.controls.code;
  }

  get hashtag(): FormControl<string> {
    return this.form.controls.hashtag;
  }

  get technology(): FormControl<string | string[]> {
    return this.form.controls.technology;
  }

  get rating(): FormControl<string> {
    return this.form.controls.rating;
  }

  get status(): FormControl<string> {
    return this.form.controls.status;
  }
}
