import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { routes } from '../../../../../consts';

@Component({
    selector: 'app-google-map-page',
    templateUrl: './google-map-page.component.html',
    styleUrls: ['./google-map-page.component.scss'],
    standalone: false
})
export class GoogleMapPageComponent {
  public routes: typeof routes = routes;
  public readonly mapEmbedUrl: SafeResourceUrl;
  public readonly center = { lat: -37.813179, lng: 144.950259 };

  constructor(private sanitizer: DomSanitizer) {
    const bbox = [144.85, -37.90, 145.05, -37.75].join('%2C');
    const marker = `${this.center.lat}%2C${this.center.lng}`;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`
    );
  }
}
