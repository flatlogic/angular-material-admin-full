import { Component } from '@angular/core';
import {routes} from '../../../../consts';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, ProductService} from '../../services';

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss']
})
export class ProductCreatePageComponent {
  public routes: typeof routes = routes;

  constructor(
    private _productService: ProductService,
    private router: Router
  ) {
  }

  public createProduct(product: Product): void {
    this._productService.createProduct(product).subscribe(() => {
      this._productService.finishCreatingProduct();
      this.router.navigate([this.routes.MANAGEMENT]).then();
    });
  }
}
