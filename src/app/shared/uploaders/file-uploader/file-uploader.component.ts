import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FileUploaderService } from '../../services/file-uploader.service';
import { APP_RUNTIME_CONFIG, AppRuntimeConfig } from '../../../app.config';
import { v4 as uuidv4 } from 'uuid';
import { MatButtonModule } from '@angular/material/button';
import { take } from 'rxjs';

type FileUploadDto = {
  id: string;
  name: string;
  sizeInBytes: number;
  privateUrl: string;
  publicUrl: string;
  new: boolean;
};

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    standalone: true,
    imports: [MatButtonModule]
})
export class FileUploaderComponent implements OnInit {
  @Input() entityName: string;
  @Input() propertyName: string;
  @Output() fileUploaded = new EventEmitter<FileUploadDto>();

  config: AppRuntimeConfig;
  files: FileUploadDto[] = [];

  constructor(
    @Inject(APP_RUNTIME_CONFIG) appConfig: AppRuntimeConfig,
    private fileUploaderService: FileUploaderService,
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
    const privateUrl = `/${this.entityName}/file/${id}.${extension}`;
    const publicUrl = `${config.baseURLApi}/api/file/download?privateUrl=${this.entityName}/${this.propertyName}/${id}.${extension}`;

    formData.append('file', file);
    formData.append('filename', `${id}.${extension}`);

    const api = `/api/file/upload/${this.entityName}/${this.propertyName}`;
    this.fileUploaderService.upload(formData, api).pipe(take(1)).subscribe(() => {
      console.log('Image has been uploaded.');
      this.emitChange(id, file, privateUrl, publicUrl);
    });
  }

  deleteFile(_id: string) {}

  private extractExtensionFrom(filename: string): string {
    if (!filename) {
      return '';
    }
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(filename)?.[1] || '';
  }

  private emitChange(
    id: string,
    file: File,
    privateUrl: string,
    publicUrl: string,
  ): void {
    const fileDto: FileUploadDto = {
      id,
      name: file.name,
      sizeInBytes: file.size,
      privateUrl,
      publicUrl,
      new: true,
    };
    this.files.push(fileDto);
    this.fileUploaded.emit(fileDto);
  }
}
