import { Component } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './ui-page.component.html',
  styleUrls: ['./ui-page.component.scss']
})
export class UiPageComponent {
  public routes: typeof routes = routes;
}
