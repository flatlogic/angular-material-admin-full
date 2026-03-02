import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './libs-page.component.html',
  styleUrls: ['./libs-page.component.scss']
})
export class LibsPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
