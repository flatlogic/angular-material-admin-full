import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterConfig, FilterItems } from '../models/common';
import { MatCardModule } from '@angular/material/card';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    standalone: true,
    imports: [
      MatCardModule,
      NgSelectModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
    ]
})
export class FilterComponent implements OnInit {
  @Input() config: FilterConfig[] = [];
  @Input() filters: FilterItems[] = [];
  @Output() clearFilterConfirmed = new EventEmitter<void>();
  @Output() deleteFilterConfirmed = new EventEmitter<void>();
  @Output() submitConfirmed = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  delFilter(index: number): void {
    this.config.splice(index, 1);
    this.deleteFilterConfirmed.emit();
  }

  clearFilters(): void {
    this.clearFilterConfirmed.emit();
  }

  submitHandler(): void {
    let request = '?';
    this.config.forEach((item: FilterConfig) => {
      item.number
        ? (request += `${item.filter}Range=${item.valueFrom}&${item.filter}Range=${item.valueTo}&`)
        : (request += `${item.filter}=${item.value}&`);
    });

    this.submitConfirmed.emit(request);
  }

  onSelect(
    event: FilterItems | string | null,
    index: number,
    data: FilterConfig,
  ): void {
    if (!event) {
      return;
    }

    const selected =
      typeof event === 'string'
        ? this.filters.find((item) => item.title === event)
        : event;

    data.filter = selected?.title ?? data.filter;
    data.number = selected?.number === 'true';
    this.config.splice(index, 1, data);
  }

  onKeyUp(
    value: string,
    index: number,
    data: FilterConfig,
    valueFrom?: number | string,
    valueTo?: number | string,
  ): void {
    data.value = value;
    if (valueFrom !== undefined && valueFrom !== null && valueFrom !== '') {
      data.valueFrom = valueFrom;
    }
    if (valueTo !== undefined && valueTo !== null && valueTo !== '') {
      data.valueTo = valueTo;
    }
    this.config.splice(index, 1, data);
  }
}
