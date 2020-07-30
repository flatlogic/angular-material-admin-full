import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {TablesService} from '../../services';
import {Nutrition} from '../../models/nutrition';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-tables-dynamic-page',
  templateUrl: './tables-dynamic-page.component.html',
  styleUrls: ['./tables-dynamic-page.component.scss']
})
export class TablesDynamicPageComponent {
  public nutritionTableData$: Observable<Nutrition[]>
  // public materialTableData$: Observable<Customer[]>
  public routes: typeof routes = routes;

  constructor(private service: TablesService) {
    this.nutritionTableData$ = service.loadNutritionTableData();
    // this.materialTableData$ = service.loadMaterialTableData();
  }
}
