import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import {routes} from '../../../../../consts';

@Component({
    selector: 'app-tooltips-page',
    templateUrl: './tooltips-page.component.html',
    styleUrls: ['./tooltips-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class TooltipsPageComponent {
  @ViewChild('tooltip') tooltip!: MatTooltip;
  public routes: typeof routes = routes;
  public isShow = false;

  public showTooltip(): void {
    this.isShow = true;
    this.tooltip?.show();
    // this.isShow = false;
  }
}
