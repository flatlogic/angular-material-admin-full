import {Component, Input, OnInit} from '@angular/core';

import {Item, Order} from '../../models';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-invoice-card',
  templateUrl: './invoice-card.component.html',
  styleUrls: ['./invoice-card.component.scss']
})
export class InvoiceCardComponent implements OnInit {
  @Input() public order: Order;
  public displayedColumns: string[] = ['id', 'name', 'description', 'quantity', 'price', 'total'];
  public dataSource: MatTableDataSource<Item>;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Item>(this.order.items);
  }
}
