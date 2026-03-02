import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {routes} from '../../../../consts';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from '../../services';
import {ProductDetails} from '../../models/product-details';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-product-edit-page',
    templateUrl: './product-edit-page.component.html',
    styleUrls: ['./product-edit-page.component.scss'],
    standalone: false
})
export class ProductEditPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public product$?: Observable<ProductDetails>;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (id) {
          this.product$ = this.service.getProduct(id);
        }
      });
  }

  public saveEditProduct(product: ProductDetails) {
    this.service.saveChangedProduct(product);

    this.router.navigate([this.routes.MANAGEMENT]).then();
  }
}
