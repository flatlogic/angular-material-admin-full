import { Component } from '@angular/core';

import { routes } from '../../../../../consts';
import { Observable } from 'rxjs';
import { Order } from '../../models';

import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.scss']
})
export class InvoicePageComponent {
  public routes: typeof routes = routes;
  public orderInfo$: Observable<Order>;

  constructor(public service: InvoiceService) {
    this.orderInfo$ = this.service.getOrderInfo();
  }
}
