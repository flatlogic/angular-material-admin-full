import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploaderService } from '../../services/file-uploader.service';
import { AppConfig } from '../../../app.config';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() entityName: string;
  @Input() propertyName: string;
  @Output() fileUploaded = new EventEmitter<any>();

  config: any;
  files = [];

  constructor(
    private appConfig: AppConfig,
    private fileUploaderService: FileUploaderService,
  ) {
    this.config = appConfig.getConfig();
  }

  ngOnInit(): void {}

  uploadFile(event: any): void {
    const config = this.config;
    const formData = new FormData();
    const files = event.target.files;
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
    this.fileUploaderService.upload(formData, api).subscribe((res) => {
      console.log('Image has been uploaded.');
      this.emitChange(id, file, privateUrl, publicUrl);
    });
  }

  deleteFile(id: string) {}

  private extractExtensionFrom(filename): string {
    if (!filename) {
      return null;
    }
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(filename)[1];
  }

  private emitChange(id: string, file, privateUrl: string, publicUrl: string) {
    const fileDto = {
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
