import { Component } from '@angular/core';

import { routes } from '../../../../../consts';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss']
})
export class TabsPageComponent {
  public routes: typeof routes = routes;
}
