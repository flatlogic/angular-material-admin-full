import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListPageComponent } from './list-page.component';
import { UserDetails } from '../../models';
import { UserService } from '../../service';

describe('ListPageComponent', () => {
  let fixture: ComponentFixture<ListPageComponent>;
  let component: ListPageComponent;

  const mockUsers: UserDetails[] = [
    {
      id: '1',
      name: 'Jane Hew',
      role: 'admin',
      companyName: 'Flatlogic',
      email: 'admin@flatlogic.com',
      status: 'active',
      createdAt: '2020-06-07',
    },
    {
      id: '2',
      name: 'Axel Pittman',
      role: 'user',
      companyName: 'Flatlogic',
      email: 'axel@flatlogic.com',
      status: 'inactive',
      createdAt: '2020-06-07',
    },
  ];

  const userServiceMock = {
    getUsers: jest.fn(() => of(mockUsers)),
  } as unknown as UserService;

  const dialogMock = {
    open: jest.fn(),
  } as unknown as MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPageComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    })
      .overrideTemplate(ListPageComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    component.sort = {} as MatSort;
    component.paginator = {} as MatPaginator;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates datasource from UserService payload', () => {
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('selects and clears all rows via masterToggle', () => {
    expect(component.selection.selected.length).toBe(0);

    component.masterToggle();
    expect(component.selection.selected.length).toBe(mockUsers.length);
    expect(component.isAllSelected()).toBe(true);

    component.masterToggle();
    expect(component.selection.selected.length).toBe(0);
    expect(component.isAllSelected()).toBe(false);
  });

  it('opens delete dialog with expected width', () => {
    component.deleteUser();

    expect(dialogMock.open).toHaveBeenCalledWith(expect.any(Function), {
      width: '396px',
    });
  });
});
