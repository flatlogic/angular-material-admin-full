import {Component} from '@angular/core';

import { routes } from '../../../../../consts';

@Component({
  selector: 'app-typography-page',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss']
})
export class TypographyPageComponent {
  public routes: typeof routes = routes;
}
