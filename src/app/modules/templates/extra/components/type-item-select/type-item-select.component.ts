import { Component } from '@angular/core';

enum SelectedFields {
  all = 'All',
  popular = 'Popular',
  interesting = 'Interesting',
  latest = 'Latest'
}

@Component({
  selector: 'app-type-item-select',
  templateUrl: './type-item-select.component.html',
  styleUrls: ['./type-item-select.component.scss']
})
export class TypeItemSelectComponent {
  public selectedFields: typeof SelectedFields = SelectedFields;
  public selectedValue = this.selectedFields.popular;
}
