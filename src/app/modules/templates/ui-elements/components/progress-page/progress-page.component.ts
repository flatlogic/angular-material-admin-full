import {Component} from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-progress-page',
  templateUrl: './progress-page.component.html',
  styleUrls: ['./progress-page.component.scss']
})
export class ProgressPageComponent {
  public routes: typeof routes = routes
}
