import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './quick-start-page.component.html',
  styleUrls: ['./quick-start-page.component.scss']
})
export class QuickStartPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
