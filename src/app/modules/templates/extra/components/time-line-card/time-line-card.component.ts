import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TimeLineItem } from '../../models';

@Component({
    selector: 'app-time-line-card',
    templateUrl: './time-line-card.component.html',
    styleUrls: ['./time-line-card.component.scss'],
    standalone: false
})
export class TimeLineCardComponent {
  @Input() public timeLineItem: TimeLineItem;
  public readonly center = { lat: -37.813179, lng: 144.950259 };
  public readonly mapEmbedUrl: SafeResourceUrl;
  public isShowText: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
    const bbox = [144.85, -37.90, 145.05, -37.75].join('%2C');
    const marker = `${this.center.lat}%2C${this.center.lng}`;
    this.mapEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`
    );
  }

  public showText(): void {
    this.isShowText = !this.isShowText;
  }
}
