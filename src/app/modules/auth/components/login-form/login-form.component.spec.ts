import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../../../app.config';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;

  const config: AppRuntimeConfig = {
    version: '1.2.0',
    remote: 'http://localhost:8080',
    isBackend: true,
    hostApi: 'http://localhost',
    portApi: '8080',
    baseURLApi: 'http://localhost:8080',
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [{ provide: APP_RUNTIME_CONFIG, useValue: config }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not emit login payload when form is invalid', () => {
    const emitSpy = jest.spyOn(component.sendLoginForm, 'emit');
    component.form.setValue({
      email: 'not-valid-email',
      password: '',
    });

    component.login();

    expect(component.form.invalid).toBe(true);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('emits credentials when form is valid', () => {
    const emitSpy = jest.spyOn(component.sendLoginForm, 'emit');
    const payload = {
      email: 'user@example.com',
      password: 'StrongPassword1',
    };
    component.form.setValue(payload);

    component.login();

    expect(component.form.valid).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith(payload);
  });
});
