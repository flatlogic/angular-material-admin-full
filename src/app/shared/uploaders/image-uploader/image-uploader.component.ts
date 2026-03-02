import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../../app.config';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { ImageInterface } from '../../models/image.interface';
import { MatButtonModule } from '@angular/material/button';
import { take } from 'rxjs';

type ImageUploadControls = {
  name: FormControl<string>;
  file: FormControl<string>;
  imgSrc: FormControl<string>;
};

@Component({
    selector: 'app-image-uploader',
    templateUrl: './image-uploader.component.html',
    styleUrls: ['./image-uploader.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatButtonModule]
})
export class ImageUploaderComponent implements OnInit {
  @Input() entityName: string;
  @Input() propertyName: string;
  @Input() imageList: ImageInterface[];
  @Output() imageUploaded = new EventEmitter<ImageInterface>();
  @Output() imageDeleted = new EventEmitter<string>();

  config: AppRuntimeConfig;
  imgFile = '';

  uploadForm = new FormGroup<ImageUploadControls>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    file: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    imgSrc: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    @Inject(APP_RUNTIME_CONFIG) appConfig: AppRuntimeConfig,
    private imageUploaderService: ImageUploaderService,
  ) {
    this.config = appConfig;
  }

  ngOnInit(): void {}

  uploadFile(event: Event): void {
    const config = this.config;
    const formData = new FormData();
    const input = event.target as HTMLInputElement | null;
    const files = input?.files;
    if (!files || !files.length) {
      return;
    }
    const file = files[0];
    const extension = this.extractExtensionFrom(file.name);
    const id = uuidv4();
    const privateUrl = `/${this.entityName}/${this.propertyName}/${id}.${extension}`;
    const publicUrl = `${config.baseURLApi}/api/file/download?privateUrl=${this.entityName}/${this.propertyName}/${id}.${extension}`;
    formData.append('file', file);
    formData.append('filename', `${id}.${extension}`);

    const api = `/api/file/upload/${this.entityName}/${this.propertyName}`;
    this.imageUploaderService.upload(formData, api).pipe(take(1)).subscribe(() => {
      console.log('Image has been uploaded.');
      this.showImage(event);
      this.emitChange(id, file, privateUrl, publicUrl);
    });
  }

  onRemove(id: string) {
    this.imageDeleted.emit(id);
  }

  private showImage(event: Event): void {
    const reader = new FileReader();
    const input = event.target as HTMLInputElement | null;

    if (input?.files && input.files.length) {
      const [file] = input.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        const fileSource = typeof reader.result === 'string' ? reader.result : '';
        this.imgFile = fileSource;
        this.uploadForm.patchValue({
          imgSrc: fileSource,
        });
      };
    }
  }

  private extractExtensionFrom(filename: string): string {
    if (!filename) {
      return '';
    }
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(filename)?.[1] || '';
  }

  private emitChange(id: string, file: File, privateUrl: string, publicUrl: string): void {
    const imageDto: ImageInterface = {
      id,
      name: file.name,
      sizeInBytes: file.size,
      privateUrl,
      publicUrl,
      new: true,
    };
    this.imageUploaded.emit(imageDto);
  }
}
