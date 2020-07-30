import {Component} from '@angular/core';
import {routes} from '../../../../consts';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent {
  public routes: typeof routes = routes;
  public step: number = 0;

  public increment() {
    this.step++;
  }

  public decrement() {
    this.step--;
  }
}

