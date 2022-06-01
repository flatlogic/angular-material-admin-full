import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-form-validation-page',
  templateUrl: './form-validation-page.component.html',
  styleUrls: ['./form-validation-page.component.scss']
})
export class FormValidationPageComponent implements OnInit {
  public routes: typeof routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
