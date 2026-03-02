import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { FileUploaderComponent } from './file-uploader.component';
import { APP_RUNTIME_CONFIG } from '../../../app.config';
import { FileUploaderService } from '../../services/file-uploader.service';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;
  const appConfigMock = {
    baseURLApi: 'http://localhost:8080',
    isBackend: false,
    auth: {
      email: 'admin@flatlogic.com',
      password: 'password',
    },
  };
  const uploaderServiceMock = {
    upload: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploaderComponent],
      providers: [
        {
          provide: APP_RUNTIME_CONFIG,
          useValue: appConfigMock,
        },
        {
          provide: FileUploaderService,
          useValue: uploaderServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
