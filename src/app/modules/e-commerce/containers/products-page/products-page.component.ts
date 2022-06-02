import {Component, OnInit} from '@angular/core';

import { routes } from '../../../../consts';
import {ProductsService} from '../../services';
import {Observable} from 'rxjs';
import {ProductCard} from '../../models';
import {FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public products$: Observable<ProductCard[]>
  public form: FormGroup;

  constructor(private service: ProductsService) {
    this.products$ = this.service.getProducts();
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
