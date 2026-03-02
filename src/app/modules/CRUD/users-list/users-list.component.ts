import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';
import { UsersService } from '../../../shared/services/users.service';
import { routes } from '../../../consts';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../../../shared/popups/delete-popup/delete-popup.component';
import { Users } from '../../../shared/models/users.model';
import { MatPaginator } from '@angular/material/paginator';
import { FilterConfig, FilterItems } from '../../../shared/models/common';
import { environment } from '../../../../environments/environment';
import { take } from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: false
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users: Users[];
  loading = false;
  selectedId: string;
  public routes: typeof routes = routes;
  public displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
    'role',
    'disabled',
    'avatar',
    'actions',
  ];
  public dataSource: MatTableDataSource<Users>;
  config: FilterConfig[] = [];
  showFilters = false;
  filters: FilterItems[] = [
    { label: 'First Name', title: 'firstName' },
    { label: 'Last Name', title: 'lastName' },
    { label: 'Phone Number', title: 'phoneNumber' },
    { label: 'E-Mail', title: 'email' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dataFormatterService: DataFormatterService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  addFilter(): void {
    !this.showFilters ? (this.showFilters = true) : null;
    this.config.push({});
  }

  submitHandler(request: string): void {
    this.usersService.getFilteredData(request).pipe(take(1)).subscribe({
      next: (res) => {
        this.setUsersData(res.rows);
      },
      error: () => {
        this.toastr.error('Failed to load users');
        this.setUsersData([]);
      },
    });
  }

  clearFilters(): void {
    this.getUsers();
  }

  delFilter() {
    this.config.length === 0 ? (this.showFilters = false) : null;
  }

  create(): void {
    this.router.navigate([this.routes.Users_CREATE]);
  }

  edit(row: Users): void {
    this.router.navigate([routes.Users_EDIT, row.id]);
  }

  openDeleteModal(id: string): void {
    this.selectedId = id;
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '512px',
    });

    dialogRef.componentInstance.deleteConfirmed
      .pipe(take(1))
      .subscribe(() => {
        this.onDelete(this.selectedId);
      });
  }

  onDelete(id: string): void {
    this.usersService.delete(id).pipe(take(1)).subscribe({
      next: () => {
        this.toastr.success('Users deleted successfully');
        this.getUsers();
      },
      error: () => {
        this.toastr.error('Something was wrong. Try again');
      },
    });
  }

  sort(e): void {
    this.submitHandler(`?field=${e.active}&sort=${e.direction}`);
  }

  setLimit(e): void {
    this.submitHandler(`?limit=${e.pageSize}`);
  }

  private getUsers(): void {
    this.usersService.getAll().pipe(take(1)).subscribe({
      next: (res) => {
        this.setUsersData(res.rows);
      },
      error: () => {
        this.toastr.error('Failed to load users');
        this.setUsersData([]);
      },
    });
  }

  private setUsersData(rows: Users[]): void {
    this.users = rows;
    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.paginator = this.paginator;
  }

  redirectToSwagger() {
    return environment.production
      ? window.location.origin + '/api-docs/#/Users'
      : 'http://localhost:8080/api-docs/#/Users';
  }
}
