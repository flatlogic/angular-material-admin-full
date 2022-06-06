import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../../../app.config';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploaderService } from '../../services/image-uploader.service';
import { ImageInterface } from '../../models/image.interface';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Input() entityName: string;
  @Input() propertyName: string;
  @Input() imageList: ImageInterface[];
  @Output() imageUploaded = new EventEmitter<any>();
  @Output() imageDeleted = new EventEmitter<any>();

  config: any;
  imgFile: string;

  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required]),
  });

  constructor(
    private appConfig: AppConfig,
    private imageUploaderService: ImageUploaderService,
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
    const privateUrl = `/${this.entityName}/${this.propertyName}/${id}.${extension}`;
    const publicUrl = `${config.baseURLApi}/api/file/download?privateUrl=${this.entityName}/${this.propertyName}/${id}.${extension}`;
    formData.append('file', file);
    formData.append('filename', `${id}.${extension}`);

    const api = `/api/file/upload/${this.entityName}/${this.propertyName}`;
    this.imageUploaderService.upload(formData, api).subscribe((res) => {
      console.log('Image has been uploaded.');
      this.showImage(event);
      this.emitChange(id, file, privateUrl, publicUrl);
    });
  }

  onRemove(id: string) {
    this.imageDeleted.emit(id);
  }

  private showImage(e: any): void {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result,
        });
      };
    }
  }

  private extractExtensionFrom(filename): string {
    if (!filename) {
      return null;
    }
    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(filename)[1];
  }

  private emitChange(id: string, file, privateUrl: string, publicUrl: string) {
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
