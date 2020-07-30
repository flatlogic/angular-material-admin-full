import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { routes } from '../../../../../consts';
import { GalleryItem } from '../../models';
import { GalleryService } from '../../services';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.scss']
})
export class GalleryPageComponent {
  public routes: typeof routes = routes;
  public galleryInfo$: Observable<GalleryItem[]>;

  constructor(public service: GalleryService) {
    this.galleryInfo$ = this.service.getGalleryInfo();
  }
}
