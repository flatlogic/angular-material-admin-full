import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterConfig, FilterItems } from '../models/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() config: FilterConfig[];
  @Input() filters: FilterItems[];
  @Output() clearFilterConfirmed = new EventEmitter<any>();
  @Output() deleteFilterConfirmed = new EventEmitter<any>();
  @Output() submitConfirmed = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  delFilter(index) {
    this.config.splice(index, 1);
    this.deleteFilterConfirmed.emit();
  }

  clearFilters() {
    this.clearFilterConfirmed.emit();
  }

  submitHandler() {
    let request = '?';
    this.config.forEach((item: FilterConfig) => {
      item.number
        ? (request += `${item.filter}Range=${item.valueFrom}&${item.filter}Range=${item.valueTo}&`)
        : (request += `${item.filter}=${item.value}&`);
    });

    this.submitConfirmed.emit(request);
  }

  onSelect(event: any, index: number, data: any) {
    data.filter = event.title;
    data.number = event.number === 'true';
    this.config.splice(index, 1, data);
  }

  onKeyUp(
    value: any,
    index: number,
    data: any,
    valueFrom?: any,
    valueTo?: any,
  ) {
    data.value = value;
    if (valueFrom) {
      data.valueFrom = valueFrom;
    }
    if (valueTo) {
      data.valueTo = valueTo;
    }
    this.config.splice(index, 1, data);
  }
}
