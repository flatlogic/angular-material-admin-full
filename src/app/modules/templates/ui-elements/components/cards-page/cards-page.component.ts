import {Component} from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.scss']
})
export class CardsPageComponent {
  public routes: typeof routes = routes
}
