import { Component } from '@angular/core';

enum SelectedFields {
  allTime = 'All Time',
  last24h = 'Last 24h',
  lastMonth = 'Last Month',
  lastYear = 'Last Year',
  latest = 'Latest'
}

@Component({
  selector: 'app-time-period-select',
  templateUrl: './time-period-select.component.html',
  styleUrls: ['./time-period-select.component.scss']
})
export class TimePeriodSelectComponent {
  public selectedFields: typeof SelectedFields = SelectedFields;
  public selectedValue = this.selectedFields.latest;
}
