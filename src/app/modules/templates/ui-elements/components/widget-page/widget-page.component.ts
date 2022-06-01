import { Component } from '@angular/core';
import { routes } from '../../../../../consts';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.scss']
})
export class WidgetPageComponent {
  public routes: typeof routes = routes;
}
