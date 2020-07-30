import {Component} from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-badge-page',
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss']
})
export class BadgePageComponent {
  public routes: typeof routes = routes;
}
