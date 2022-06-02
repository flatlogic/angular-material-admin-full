import {Component, OnInit} from '@angular/core';
import {routes} from '../../../../consts';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService, ProductsService} from '../../services';
import {Observable} from 'rxjs';
import {ProductCard} from '../../models';
import {ProductDetails} from '../../models/product-details';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public form: FormGroup;
  public products$: Observable<ProductCard[]>
  public product$: Observable<ProductDetails>

  constructor(
    private service: ProductService,
    private route: ActivatedRoute
  ) {
    this.products$ = this.service.getSimilarProducts();
  }

  public ngOnInit() {
    this.form = new FormGroup({
      size: new FormControl('2'),
      value: new FormControl('2'),
    });

    this.route.paramMap.subscribe((params: any) => {
      if (params.params.id) {
        this.product$ = this.service.getProduct(params.params.id);
      } else {
        this.product$ = this.service.getProduct('1');
      }
    });
  }

  get size() {
    return this.form.get('size') as FormControl;
  }

  get value() {
    return this.form.get('value') as FormControl;
  }

}
