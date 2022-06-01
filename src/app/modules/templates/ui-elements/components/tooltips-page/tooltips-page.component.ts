import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-tooltips-page',
  templateUrl: './tooltips-page.component.html',
  styleUrls: ['./tooltips-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TooltipsPageComponent {
  @ViewChild('tooltip') tooltip: any;
  public routes: typeof routes = routes;
  public isShow = false;

  public showTooltip(): void {
    this.isShow = true;
    this.tooltip.show();
    // this.isShow = false;
  }
}
