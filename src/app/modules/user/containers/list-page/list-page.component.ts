import {Component, OnInit, ViewChild} from '@angular/core';
import {routes} from '../../../../consts';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {take} from 'rxjs/operators';
import {UserDetails} from '../../models';
import {UserService} from '../../service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteUserPopupComponent} from '../../popups/delete-user-popup/delete-user-popup.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public routes: typeof routes = routes;
  public users$: Observable<UserDetails[]>;
  public displayedColumns: string[] = ['select', 'id', 'name', 'role', 'company_name', 'email', 'status', 'created_at', 'actions'];
  public dataSource: MatTableDataSource<UserDetails>;

  selection = new SelectionModel<UserDetails>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  constructor(
    private service: UserService,
    public dialog: MatDialog
  ) {
    this.users$ = this.service.getUsers();


    this.users$.pipe(
      take(1)
    ).subscribe((users: UserDetails[]) => {
      this.dataSource = new MatTableDataSource(users);
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public deleteUser(): void {
    const dialogRef = this.dialog.open(DeleteUserPopupComponent, {
      width: '396px'
    });
  }
}
