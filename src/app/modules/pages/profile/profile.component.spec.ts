import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { DataFormatterService } from '../../../shared/services/data-formatter.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const authServiceMock = {
    getCurrentUserInfo: jest.fn().mockReturnValue(of({})),
  };
  const usersServiceMock = {
    update: jest.fn().mockReturnValue(of({})),
  };
  const toastrServiceMock = {
    success: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: ToastrService,
          useValue: toastrServiceMock,
        },
        {
          provide: DataFormatterService,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(ProfileComponent, {
        set: {
          template: '',
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
