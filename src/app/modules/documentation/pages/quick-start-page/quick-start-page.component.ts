import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
  selector: 'app-quick-start-page',
  templateUrl: './quick-start-page.component.html',
  styleUrls: ['./quick-start-page.component.scss']
})
export class QuickStartPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
