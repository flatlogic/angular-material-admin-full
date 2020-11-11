import { Component, Input } from '@angular/core';
import { routes } from '../../../../consts';
import { Product } from '../../services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
  public routes: typeof routes = routes;
}
