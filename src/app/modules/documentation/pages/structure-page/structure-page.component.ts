import { Component } from '@angular/core';
import { routes } from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './structure-page.component.html',
  styleUrls: ['./structure-page.component.scss']
})
export class StructurePageComponent {
  public routes: typeof routes = routes;
}
