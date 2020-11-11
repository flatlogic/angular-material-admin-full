import {Component, OnInit, ViewChild} from '@angular/core';
import {routes} from '../../../../consts';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Product, ProductService} from '../../services';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss']
})
export class ManagementPageComponent {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public routes: typeof routes = routes;
  public products: Product[] = [];
  public displayedColumns: string[] = ['select', 'id', 'image', 'title', 'subtitle', 'price', 'rating', 'actions'];
  public dataSource: MatTableDataSource<Product>;
  selection = new SelectionModel<any>(true, []);

  constructor(public productService: ProductService) {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.products = products;
      this.productService.finishGetProducts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  public delete(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        this.products = this.products.filter(product => product.id !== +id);
        this.dataSource = new MatTableDataSource(this.products);
      });
  }
}
