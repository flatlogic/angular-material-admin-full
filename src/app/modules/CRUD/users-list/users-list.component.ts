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

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users: Users[];
  loading = false;
  selectedId: string;
  deleteConfirmSubscription;
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
    this.usersService.getFilteredData(request).subscribe((res) => {
      this.users = res.rows;
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
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

    this.deleteConfirmSubscription =
      dialogRef.componentInstance.deleteConfirmed.subscribe((result) => {
        this.onDelete(this.selectedId);
      });
  }

  onDelete(id: string): void {
    this.usersService.delete(id).subscribe({
      next: (res) => {
        this.deleteConfirmSubscription.unsubscribe();
        this.toastr.success('Users deleted successfully');
        this.getUsers();
      },
      error: (err) => {
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
    this.usersService.getAll().subscribe((res) => {
      this.users = res.rows;
      this.dataSource = new MatTableDataSource(res.rows);
      this.dataSource.paginator = this.paginator;
    });
  }

  redirectToSwagger() {
    return process.env.NODE_ENV === 'production'
      ? window.location.origin + '/api-docs/#/Users'
      : 'http://localhost:8080/api-docs/#/Users';
  }
}
