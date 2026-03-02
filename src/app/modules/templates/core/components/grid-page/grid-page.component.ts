import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
    selector: 'app-grid-page',
    templateUrl: './grid-page.component.html',
    styleUrls: ['./grid-page.component.scss'],
    standalone: false
})
export class GridPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
