import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../consts';

@Component({
    standalone: false,
  templateUrl: './licences-page.component.html',
  styleUrls: ['./licences-page.component.scss']
})
export class LicencesPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
