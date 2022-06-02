import {Component, Input} from '@angular/core';
import {ProductCard} from '../../models';
import {routes} from '../../../../consts';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: ProductCard;
  public routes: typeof routes = routes;
}
