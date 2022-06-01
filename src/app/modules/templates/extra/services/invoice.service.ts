import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public getOrderInfo(): Observable<Order> {
    return of({
      id: '#9.45613',
      date: '17 May 2014',
      img: './assets/extra/invoice/logo.jpg',
      client: {
        company: 'Allspana',
        email: 'maryna@allspana.by',
        fax: '(012) 678-132-901',
        name: 'Veronica Niasvizhskaja',
        note: 'Some nights I stay up cashing in my bad luck. Some nights I call it a draw',
        phone: '(012) 345-678-901'
      },
      company: {
        name: 'Flatlogic LLC',
        address: 'Minsk, Belarus 220004',
        location: '088.253.5345',
        email: 'email@example.com',
        fax: '(012) 678-132-901',
        phone: '(012) 345-678-901',
        status: '2 Infinite Loop',
      },
      items: [
        {id: '1', name: 'Brand-new 27 monitor', description: '2,560x1,440-pixel (WQHD) resolution supported!', price: '700', quantity: '2', total: '1400'},
        {id: '2', name: 'Domain: okendoken.com', description: '6-month registration', price: '10.99', quantity: '1', total: '10.99'},
        {id: '3', name: 'Atlas Shrugged', description: 'Novel by Ayn Rand, first published in 1957 in the United States', price: '35', quantity: '5', total: '175'},
        {id: '4', name: 'New Song by Dr. Pre', description: 'Lyrics: praesent blandit augue non sapien ornare imperdiet', price: '2', quantity: '1', total: '2'}
      ],
      consultantName: 'Bob Smith',
      note: 'Thank you for your business. Keep in mind, sometimes bad things happen. But it\'s just sometimes.',
      subtotal: '1,598.88',
      tax: '159.89',
      total: '1,758.77'
    });
  }
}
