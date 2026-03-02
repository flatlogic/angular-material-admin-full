import { Component } from '@angular/core';
import { routes } from '../../consts';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterModule]
})
export class NotFoundComponent {
  public routes: typeof routes = routes;
}
