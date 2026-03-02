import {Component, OnInit} from '@angular/core';

import { routes } from '../../../../consts';
import {ProductsService} from '../../services';
import {Observable} from 'rxjs';
import {ProductCard} from '../../models';
import {FormControl, FormGroup } from '@angular/forms';

type ProductsFilterControls = {
  type: FormControl<string>;
  brands: FormControl<string>;
  size: FormControl<string>;
  color: FormControl<string>;
  range: FormControl<string>;
  sort: FormControl<string>;
};

@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss'],
    standalone: false
})
export class ProductsPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public products$: Observable<ProductCard[]>
  public form!: FormGroup<ProductsFilterControls>;

  constructor(private service: ProductsService) {
    this.products$ = this.service.getProducts();
  }

  public ngOnInit() {
    this.form = new FormGroup<ProductsFilterControls>({
      type: new FormControl('shoes', { nonNullable: true }),
      brands: new FormControl('all', { nonNullable: true }),
      size: new FormControl('7', { nonNullable: true }),
      color: new FormControl('all', { nonNullable: true }),
      range: new FormControl('all', { nonNullable: true }),
      sort: new FormControl('favorite', { nonNullable: true }),
    });
  }

  get type(): FormControl<string> {
    return this.form.controls.type;
  }

  get brands(): FormControl<string> {
    return this.form.controls.brands;
  }

  get size(): FormControl<string> {
    return this.form.controls.size;
  }

  get color(): FormControl<string> {
    return this.form.controls.color;
  }

  get range(): FormControl<string> {
    return this.form.controls.range;
  }

  get sort(): FormControl<string> {
    return this.form.controls.sort;
  }
}
