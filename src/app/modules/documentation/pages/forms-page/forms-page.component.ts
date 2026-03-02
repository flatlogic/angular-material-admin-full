import { Component } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})
export class FormsPageComponent {
  public routes: typeof routes = routes;
}
