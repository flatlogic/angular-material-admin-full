import { Component } from '@angular/core';
import {routes} from '../../../../consts';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductDetails} from '../../models/product-details';
import {ProductService} from '../../services';

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create-page.component.html',
  styleUrls: ['./product-create-page.component.scss']
})
export class ProductCreatePageComponent {
  public routes: typeof routes = routes;

  constructor(
    private service: ProductService,
    private router: Router
  ) {
  }

  public createProduct(product: ProductDetails): void {
    this.service.createProduct(product);

    this.router.navigate([this.routes.MANAGEMENT]).then();
  }
}
