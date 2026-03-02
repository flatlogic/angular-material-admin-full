import { Component } from '@angular/core';

interface GridTableRow {
  value: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
}

const ELEMENT_DATA: GridTableRow[] = [
  {
    value: 'Viewport width',
    xs: '<576px',
    s: '>=576px',
    m: '>=768px',
    l: '>=992px',
    xl: '>=1200px',
  },
  {
    value: 'Recommended card columns',
    xs: '1',
    s: '1-2',
    m: '2',
    l: '3',
    xl: '3-4',
  },
  {
    value: 'Recommended gap',
    xs: '16px',
    s: '16px',
    m: '24px',
    l: '24px',
    xl: '24px',
  },
  {
    value: 'Primary layout tool',
    xs: 'CSS Grid / Flex',
    s: 'CSS Grid / Flex',
    m: 'CSS Grid / Flex',
    l: 'CSS Grid / Flex',
    xl: 'CSS Grid / Flex',
  },
  {
    value: 'Use mat-grid-list',
    xs: 'Tile blocks only',
    s: 'Tile blocks only',
    m: 'Tile blocks only',
    l: 'Tile blocks only',
    xl: 'Tile blocks only',
  },
  {
    value: 'Typical screen density',
    xs: 'Stacked content',
    s: 'Comfort',
    m: 'Comfort',
    l: 'Compact',
    xl: 'Compact',
  },
];

@Component({
    selector: 'app-grid-table',
    templateUrl: './grid-table.component.html',
    styleUrls: ['./grid-table.component.scss'],
    standalone: false
})
export class GridTableComponent {
  displayedColumns: string[] = ['value', 'xs', 's', 'm', 'l', 'xl'];
  dataSource = ELEMENT_DATA;
}
