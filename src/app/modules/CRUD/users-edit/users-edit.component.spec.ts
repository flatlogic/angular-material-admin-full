import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { APP_RUNTIME_CONFIG } from '../../../app.config';
import { UsersService } from '../../../shared/services/users.service';
import { UsersEditComponent } from './users-edit.component';

describe('editing an existing user', () => {
  function openEditor(isBackend: boolean) {
    const update = jest.fn().mockReturnValue(of({}));
    TestBed.configureTestingModule({
      providers: [
        UsersEditComponent,
        { provide: APP_RUNTIME_CONFIG, useValue: { isBackend } },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 'user-id' })) } },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: ToastrService, useValue: { success: jest.fn() } },
        { provide: UsersService, useValue: {
          getById: () => of({ email: 'user@example.test', password: 'fixture-only' }),
          update,
        } },
      ],
    });
    const component = TestBed.inject(UsersEditComponent);
    component.ngOnInit();
    return { component, update };
  }

  it('submits editable API fields without copying account credentials', () => {
    const { component, update } = openEditor(true);
    expect(component.form.controls.email.disabled).toBe(true);
    expect(component.form.controls.password.value).toBe('');
    component.form.controls.firstName.setValue('Updated');
    component.onSave();
    const [payload, id] = update.mock.calls[0];
    expect(id).toBe('user-id');
    expect(payload.firstName).toBe('Updated');
    expect(payload).not.toHaveProperty('password');
    expect(payload).not.toHaveProperty('email');
  });

  it('keeps a local demo password until a replacement is entered', () => {
    const { component, update } = openEditor(false);
    component.onSave();
    expect(update.mock.calls[0][0]).not.toHaveProperty('password');
    component.form.controls.password.setValue('replacement-fixture');
    component.onSave();
    expect(update.mock.calls[1][0].password).toBe('replacement-fixture');
  });
});
