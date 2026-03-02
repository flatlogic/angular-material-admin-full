import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthPageComponent } from './auth-page.component';
import {
  AuthService,
  LoginCredentials,
  RegisterCredentials,
} from '../../../../shared/services/auth.service';

describe('AuthPageComponent', () => {
  let fixture: ComponentFixture<AuthPageComponent>;
  let component: AuthPageComponent;

  const queryParams$ = new BehaviorSubject<Record<string, string>>({});
  const authServiceMock = {
    isAuthenticated: jest.fn(),
    receiveLogin: jest.fn(),
    receiveToken: jest.fn(),
    loginUser: jest.fn(),
    registerUser: jest.fn(),
  } as unknown as AuthService;

  beforeEach(async () => {
    (authServiceMock.isAuthenticated as jest.Mock).mockReturnValue(false);
    queryParams$.next({});

    await TestBed.configureTestingModule({
      imports: [AuthPageComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParams$.asObservable(),
          },
        },
      ],
    })
      .overrideTemplate(AuthPageComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls receiveLogin in constructor when already authenticated', () => {
    (authServiceMock.isAuthenticated as jest.Mock).mockReturnValue(true);

    const localFixture = TestBed.createComponent(AuthPageComponent);
    localFixture.detectChanges();

    expect(authServiceMock.receiveLogin).toHaveBeenCalledTimes(1);
  });

  it('calls receiveToken when token is present in query params', () => {
    queryParams$.next({ token: 'jwt-token' });
    const localFixture = TestBed.createComponent(AuthPageComponent);
    localFixture.detectChanges();

    expect(authServiceMock.receiveToken).toHaveBeenCalledWith('jwt-token');
  });

  it('delegates login form payload to AuthService.loginUser', () => {
    const creds: LoginCredentials = {
      email: 'user@example.com',
      password: 'secret',
    };

    component.sendLoginForm(creds);

    expect(authServiceMock.loginUser).toHaveBeenCalledWith(creds);
  });

  it('delegates sign form payload to AuthService.registerUser', () => {
    const creds: RegisterCredentials = {
      email: 'user@example.com',
      password: 'secret',
      confirmPassword: 'secret',
    };

    component.sendSignForm(creds);

    expect(authServiceMock.registerUser).toHaveBeenCalledWith(creds);
  });

  it('triggers google social login', () => {
    component.googleLogin();

    expect(authServiceMock.loginUser).toHaveBeenCalledWith({ social: 'google' });
  });
});
