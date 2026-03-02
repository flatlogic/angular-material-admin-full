import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { ImageUploaderComponent } from './image-uploader.component';
import { APP_RUNTIME_CONFIG } from '../../../app.config';
import { ImageUploaderService } from '../../services/image-uploader.service';

describe('ImageUploaderComponent', () => {
  let component: ImageUploaderComponent;
  let fixture: ComponentFixture<ImageUploaderComponent>;
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
      imports: [ImageUploaderComponent],
      providers: [
        {
          provide: APP_RUNTIME_CONFIG,
          useValue: appConfigMock,
        },
        {
          provide: ImageUploaderService,
          useValue: uploaderServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
