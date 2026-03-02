import { Component } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent {
  public routes: typeof routes = routes;
}
