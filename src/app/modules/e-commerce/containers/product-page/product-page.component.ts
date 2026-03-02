import {Component, DestroyRef, OnInit, inject} from '@angular/core';
import {routes} from '../../../../consts';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../services';
import {Observable} from 'rxjs';
import {ProductCard} from '../../models';
import {ProductDetails} from '../../models/product-details';
import {ActivatedRoute} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type ProductSelectionControls = {
  size: FormControl<string>;
  value: FormControl<string>;
};

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
    standalone: false
})
export class ProductPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public form!: FormGroup<ProductSelectionControls>;
  public products$: Observable<ProductCard[]>
  public product$!: Observable<ProductDetails>;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private service: ProductService,
    private route: ActivatedRoute
  ) {
    this.products$ = this.service.getSimilarProducts();
  }

  public ngOnInit() {
    this.form = new FormGroup<ProductSelectionControls>({
      size: new FormControl('2', { nonNullable: true }),
      value: new FormControl('2', { nonNullable: true }),
    });

    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const productId = params.get('id') ?? '1';
        this.product$ = this.service.getProduct(productId);
      });
  }

  get size(): FormControl<string> {
    return this.form.controls.size;
  }

  get value(): FormControl<string> {
    return this.form.controls.value;
  }

}
