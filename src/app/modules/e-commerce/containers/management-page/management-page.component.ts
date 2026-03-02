import {Component, OnInit, ViewChild} from '@angular/core';
import {routes} from '../../../../consts';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {ProductService} from '../../services';
import {Observable} from 'rxjs';
import {ProductDetails} from '../../models/product-details';
import {take} from 'rxjs';
import { DeletePopupComponent } from '../../../../shared/popups/delete-popup/delete-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-management-page',
    templateUrl: './management-page.component.html',
    styleUrls: ['./management-page.component.scss'],
    standalone: false
})
export class ManagementPageComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public routes: typeof routes = routes;
  public products$: Observable<ProductDetails[]>;
  public displayedColumns: string[] = ['select', 'id', 'image', 'title', 'subtitle', 'price', 'rating', 'actions'];
  public dataSource!: MatTableDataSource<ProductDetails>;
  public selectedId = '';

  public selection = new SelectionModel<ProductDetails>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ProductDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  constructor(private service: ProductService,
              public dialog: MatDialog) {
    this.products$ = this.service.getProducts();

    this.products$.pipe(
      take(1)
    ).subscribe((products: ProductDetails[]) => {
      this.dataSource = new MatTableDataSource(products);
    });
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDeleteModal(id: string): void {
    this.selectedId = id;
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '512px'
    });

    dialogRef.componentInstance.deleteConfirmed
      .pipe(take(1))
      .subscribe(() => {
        this.delete(this.selectedId);
      });
  }

  public delete(id: string): void {
    this.service.deleteProduct(id);

    this.products$ = this.service.getProducts();

    this.products$.pipe(
      take(1)
    ).subscribe((products: ProductDetails[]) => {
      this.dataSource = new MatTableDataSource(products);
    });
  }
}
