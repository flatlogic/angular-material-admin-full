import { Component } from '@angular/core';

const ELEMENT_DATA: any[] = [
  {value: 'Max container width', xs: 'None (auto)', s: '540px', m: '720px', l: '960px', xl: '1140px'},
  {value: 'Component property', xs: '<Grid item xs>', s: '<Grid item sm>', m: '<Grid item md>', l: '<Grid item lg>', xl: '<Grid item xl>'},
  {value: '# of columns', xs: '12', s: '12', m: '12', l: '12', xl: '12'},
  {value: 'Spacing', xs: '<Grid container spacing={2}>', s: '<Grid container spacing={2}>', m: '<Grid container spacing={2}>', l: '<Grid container spacing={2}>', xl: '<Grid container spacing={2}>'},
  {value: 'Nestable', xs: 'Yes', s: 'Yes', m: 'Yes', l: 'Yes', xl: 'Yes'},
  {value: 'Column ordering', xs: 'Yes', s: 'Yes', m: 'Yes', l: 'Yes', xl: 'Yes'}
];

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss']
})
export class GridTableComponent {
  displayedColumns: string[] = ['value', 'xs', 's', 'm', 'l', 'xl'];
  dataSource = ELEMENT_DATA;
}
