import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-colors-page',
  templateUrl: './colors-page.component.html',
  styleUrls: ['./colors-page.component.scss']
})
export class ColorsPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
