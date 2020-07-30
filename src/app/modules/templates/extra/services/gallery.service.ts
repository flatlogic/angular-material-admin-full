import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GalleryItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  public getGalleryInfo(): Observable<GalleryItem[]> {
    return of([
      {img: './assets/extra/gallery/1.png'},
      {img: './assets/extra/gallery/2.png'},
      {img: './assets/extra/gallery/3.png'},
      {img: './assets/extra/gallery/4.png'},
      {img: './assets/extra/gallery/5.png'},
      {img: './assets/extra/gallery/6.png'},
      {img: './assets/extra/gallery/7.png'},
      {img: './assets/extra/gallery/8.png'},
      {img: './assets/extra/gallery/9.png'},
      {img: './assets/extra/gallery/10.png'},
      {img: './assets/extra/gallery/11.png'},
      {img: './assets/extra/gallery/12.png'}
    ]);
  }
}
