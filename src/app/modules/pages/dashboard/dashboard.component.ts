import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { routes } from '../../../consts';
import { BreadcrumbComponent } from '../../../shared/ui-elements';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [MatCardModule, BreadcrumbComponent]
})
export class DashboardComponent implements OnInit {
  public routes: typeof routes = routes;
  constructor() {}

  ngOnInit(): void {}
}
