import {Component, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRequestData } from '../../models/support-request-data';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { SettingsMenuComponent } from '../../../../shared/ui-elements';
import { ShortNamePipe } from '../../../../shared/header/pipes';

@Component({
    selector: 'app-support-requests',
    templateUrl: './support-requests.component.html',
    styleUrls: ['./support-requests.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatTableModule,
      MatSortModule,
      MatCheckboxModule,
      MatButtonModule,
      SettingsMenuComponent,
      ShortNamePipe,
    ]
})
export class SupportRequestsComponent {
  @Input() supportRequestData: SupportRequestData[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public displayedColumns: string[] = [
    'select',
    'id',
    'customer',
    'office',
    'nettoWeight',
    'price',
    'dateOfPurchase',
    'dateOfDelivery',
    'status',
    'actions'
  ];
  public selection = new SelectionModel<SupportRequestData>(true, []);
  public dataSource: MatTableDataSource<SupportRequestData>;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SupportRequestData>(this.supportRequestData);

    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: SupportRequestData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}
