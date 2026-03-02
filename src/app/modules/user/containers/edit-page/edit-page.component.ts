import { Component, OnInit } from '@angular/core';
import {routes} from '../../../../consts';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss'],
    standalone: false
})
export class EditPageComponent implements OnInit {
  public routes: typeof routes = routes;
  public selectedTab = new FormControl(0, { nonNullable: true });

  ngOnInit(): void {
  }



}
