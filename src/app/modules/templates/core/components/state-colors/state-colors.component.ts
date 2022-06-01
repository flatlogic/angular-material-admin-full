import { Component } from '@angular/core';

import { colors } from '../../../../../consts';

export interface PeriodicElement {
  state: string;
  preview: string;
  usage: string;
  hex: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {state: 'Primary', preview: 'blue', usage: 'color="primary"', hex: colors.BLUE},
  {state: 'Accent', preview: 'yellow', usage: 'color="accent"', hex: colors.YELLOW},
  {state: 'Warning', preview: 'pink', usage: 'color="warn"', hex: colors.PINK},
  {state: 'Success', preview: 'green', usage: 'color="success"', hex: colors.GREEN},
  {state: 'Info', preview: 'violet', usage: 'color="info"', hex: colors.VIOLET},
  {state: 'Default', preview: 'grey', usage: '', hex: colors.GREY}
];


@Component({
  selector: 'app-state-colors',
  templateUrl: './state-colors.component.html',
  styleUrls: ['./state-colors.component.scss']
})
export class StateColorsComponent {
  displayedColumns: string[] = ['state', 'preview', 'usage', 'hex'];
  dataSource = ELEMENT_DATA;
}
