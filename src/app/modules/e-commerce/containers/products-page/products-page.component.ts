import {Component, OnInit} from '@angular/core';

import { routes } from '../../../../consts';
import {FormControl, FormGroup } from '@angular/forms';
import { Product, ProductService } from '../../services';

@Component({
  selector: 'app-product-grid-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public products: Product[] = [];
  public form: FormGroup;

  constructor(public productService: ProductService) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.productService.finishGetProducts();
    });
  }

  public ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl('shoes'),
      brands: new FormControl('all'),
      size: new FormControl('7'),
      color: new FormControl('all'),
      range: new FormControl('all'),
      sort: new FormControl('favorite'),
    });
  }

  get type() {
    return this.form.get('type') as FormControl;
  }

  get brands() {
    return this.form.get('brands') as FormControl;
  }

  get size() {
    return this.form.get('size') as FormControl;
  }

  get color() {
    return this.form.get('color') as FormControl;
  }

  get range() {
    return this.form.get('range') as FormControl;
  }

  get sort() {
    return this.form.get('sort') as FormControl;
  }
}
