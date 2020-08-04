import { Component } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss']
})
export class TablesPageComponent {
  public routes: typeof routes = routes;
}
