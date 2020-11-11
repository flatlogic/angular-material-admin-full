import {Component, OnInit} from '@angular/core';
import {routes} from '../../../../consts';
import {FormControl, FormGroup} from '@angular/forms';
import {Product, ProductService} from '../../services';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  public routes: typeof routes = routes;
  public form: FormGroup;
  public additionalProducts: Product[] = [];
  public currentProduct: Product = new Product();

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      size: new FormControl('2'),
      value: new FormControl('2'),
    });

    this.route.params.subscribe((params: any) => {
      this.productService.getProduct(params.id || '1').subscribe((product: Product) => {
        this.currentProduct = product;
      });
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.additionalProducts = products;
        this.productService.finishGetProducts();
      })
    });
  }

  get size() {
    return this.form.get('size') as FormControl;
  }

  get value() {
    return this.form.get('value') as FormControl;
  }

}
