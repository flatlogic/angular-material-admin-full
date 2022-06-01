import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { TablesService } from '../../services';
import { Customer, Employee } from '../../models';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-tables-basic-page',
  templateUrl: './tables-basic-page.component.html',
  styleUrls: ['./tables-basic-page.component.scss']
})
export class TablesBasicPageComponent {
  public employeeTableData$: Observable<Employee[]>
  public materialTableData$: Observable<Customer[]>
  public routes: typeof routes = routes;

  constructor(private service: TablesService) {
    this.employeeTableData$ = service.loadEmployeeTableData();
    this.materialTableData$ = service.loadMaterialTableData();
  }
}
