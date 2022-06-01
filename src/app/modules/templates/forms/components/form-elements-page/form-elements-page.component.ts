import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-form-elements-page',
  templateUrl: './form-elements-page.component.html',
  styleUrls: ['./form-elements-page.component.scss']
})
export class FormElementsPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
