import {Component, Input, ViewChild} from '@angular/core';
import {Nutrition} from '../../models/nutrition';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
  @Input() nutritionTableData: Nutrition[];
  public displayedColumns: string[] = ['select', 'name', 'calories', 'fat', 'cards', 'protein'];
  public dataSource: MatTableDataSource<Nutrition>;
  public selection = new SelectionModel<Nutrition>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Nutrition>(this.nutritionTableData);

    this.dataSource.paginator = this.paginator;
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
  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
