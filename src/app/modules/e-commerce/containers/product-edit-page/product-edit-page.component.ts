import {Component, OnInit} from '@angular/core';
import {routes} from '../../../../consts';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product, ProductService} from '../../services';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.scss']
})
export class ProductEditPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public product$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.product$ = this._productService.getProduct(params.params.id);
      }
    })
  }

  public saveEditProduct(product: Product) {
    this._productService.updateProduct(product).subscribe(() => {
      this._productService.finishUpdatingProduct();
      this.router.navigate([this.routes.MANAGEMENT]).then();
    });
  }
}
