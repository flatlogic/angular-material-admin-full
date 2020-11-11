import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {routes} from '../../../../consts';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Product, ProductService } from '../../services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit-form',
  templateUrl: './product-edit-form.component.html',
  styleUrls: ['./product-edit-form.component.scss'],
})
export class ProductEditFormComponent {
  @Output() editProduct: EventEmitter<Product> = new EventEmitter<Product>();
  public router: typeof routes = routes;
  public form: FormGroup;
  public imagesObservable$: Observable<any>;
  public retrievedId;
  
  constructor(public productService: ProductService, private _activatedRoute: ActivatedRoute) {
    this.imagesObservable$ = this.productService.getProductImages();

    this.form = new FormGroup({
      img: new FormControl('', Validators['required']),
      title: new FormControl('', Validators['required']),
      subtitle: new FormControl('', Validators['required']),
      price: new FormControl(0, Validators['required']),
      discount: new FormControl(0, Validators['required']),
      description_1: new FormControl('', Validators['required']),
      description_2: new FormControl('', Validators['required']),
      code: new FormControl(0, Validators['required']),
      hashtag: new FormControl('', Validators['required']),
      technology: new FormControl('', Validators['required']),
      rating: new FormControl(0, Validators['required']),
    });

    this._activatedRoute.params.subscribe(params => {
      this.retrievedId = params.id;
      if(this.retrievedId) {
        this.productService.getProduct(this.retrievedId).subscribe((pr: Product) => {
          this.img.setValue(pr.img);
          this.title.setValue(pr.title);
          this.subtitle.setValue(pr.subtitle);
          this.price.setValue(pr.price);
          this.discount.setValue(pr.discount);
          this.description_1.setValue(pr.description_1);
          this.description_2.setValue(pr.description_2);
          this.code.setValue(pr.code);
          this.hashtag.setValue(pr.hashtag);
          this.technology.setValue(pr.technology);
          this.rating.setValue(pr.rating);
        });
      }
    })
  }

  public save(): void {
    this.editProduct.emit({
      id: this.id,
      img: this.img.value,
      title: this.title.value,
      subtitle: this.subtitle.value,
      price: this.price.value,
      discount: this.discount.value,
      description_1: this.description_1.value,
      description_2: this.description_2.value,
      code: this.code.value,
      hashtag: this.hashtag.value,
      technology: this.technology.value,
      rating: this.rating.value,
    })
  }

  get id() {
    return this.retrievedId ? this.retrievedId : +'77';
  }

  get img() {
    return this.form.get('img') as FormControl;
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

  get description_1() {
    return this.form.get('description_1') as FormControl;
  }

  get description_2() {
    return this.form.get('description_2') as FormControl;
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
}
