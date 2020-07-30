import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent {
  @Input() public img: string;
  public liked: boolean = false;
  public commented: boolean = false;

  public like(): void {
    this.liked = !this.liked;
  }

  public comment(): void {
    this.commented = !this.commented;
  }
}
