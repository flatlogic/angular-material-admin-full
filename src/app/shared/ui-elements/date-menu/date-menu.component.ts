import {Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

enum matSelectedFields {
  daily = 'Daily',
  weekly = 'Weekly',
  monthly = 'Monthly'
}

@Component({
    selector: 'app-date-menu',
    templateUrl: './date-menu.component.html',
    styleUrls: ['./date-menu.component.scss'],
    standalone: true,
    imports: [FormsModule, MatSelectModule]
})
export class DateMenuComponent {
  @Output() changeDateType = new EventEmitter<string>();
  public matSelectFields: typeof matSelectedFields = matSelectedFields;
  public selectedMatSelectValue = matSelectedFields.daily;

  public changedMatSelectionValue(dateType: string) {
    this.changeDateType.emit(dateType);
  }
}
