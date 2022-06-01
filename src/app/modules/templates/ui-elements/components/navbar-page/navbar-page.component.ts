import { Component } from '@angular/core';
import { routes } from '../../../../../consts';

@Component({
  selector: 'app-navbar-page',
  templateUrl: './navbar-page.component.html',
  styleUrls: ['./navbar-page.component.scss']
})
export class NavbarPageComponent {
  public routes: typeof routes = routes;
}
