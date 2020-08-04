import { Component } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
  selector: 'app-maps-page',
  templateUrl: './maps-page.component.html',
  styleUrls: ['./maps-page.component.scss']
})
export class MapsPageComponent {
  public routes: typeof routes = routes;
}
