import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {routes} from '../../../../consts';
import {ProductDetails} from '../../models/product-details';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.scss'],
})
export class ProductEditFormComponent implements OnInit {
  @Input() product: ProductDetails;
  @Output() editProduct: EventEmitter<ProductDetails> = new EventEmitter<ProductDetails>();
  public router: typeof routes = routes;
  public form: FormGroup;

  selected = 'option';

  constructor() {
    this.form = new FormGroup({
      image: new FormControl('', Validators['required']),
      title: new FormControl('', Validators['required']),
      subtitle: new FormControl('', Validators['required']),
      price: new FormControl('', Validators['required']),
      discount: new FormControl('', Validators['required']),
      description1: new FormControl('', Validators['required']),
      description2: new FormControl('', Validators['required']),
      code: new FormControl('', Validators['required']),
      hashtag: new FormControl('', Validators['required']),
      technology: new FormControl('', Validators['required']),
      rating: new FormControl('', Validators['required']),
      status: new FormControl('', Validators['required']),
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
    this.editProduct.emit({
      id: this.id,
      image: this.image.value,
      title: this.title.value,
      subtitle: this.subtitle.value,
      price: this.price.value,
      discount: this.discount.value,
      description1: this.description1.value,
      description2: this.description2.value,
      code: this.code.value,
      hashtag: this.hashtag.value,
      technology: this.technology.value,
      rating: this.rating.value,
      status: this.status.value,
    })
  }

  get id() {
    return this.product && this.product.id ? this.product.id : '77';
  }

  get image() {
    return this.form.get('image') as FormControl;
  }

  get title() {
    return this.form.get('title') as FormControl;
  }

  get subtitle() {
    return this.form.get('subtitle') as FormControl;
  }

  get price() {
    return this.form.get('price') as FormControl;
  }

  get discount() {
    return this.form.get('discount') as FormControl;
  }

  get description1() {
    return this.form.get('description1') as FormControl;
  }

  get description2() {
    return this.form.get('description2') as FormControl;
  }

  get code() {
    return this.form.get('code') as FormControl;
  }

  get hashtag() {
    return this.form.get('hashtag') as FormControl;
  }

  get technology() {
    return this.form.get('technology') as FormControl;
  }

  get rating() {
    return this.form.get('rating') as FormControl;
  }

  get status() {
    return this.form.get('status') as FormControl;
  }
}
