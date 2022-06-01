import {Component} from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-google-map-page',
  templateUrl: './google-map-page.component.html',
  styleUrls: ['./google-map-page.component.scss']
})
export class GoogleMapPageComponent {
  public routes: typeof routes = routes;
  public lat = -37.813179;
  public lng = 144.950259;
  public zoom = 12;
}
