import {Component, Input} from '@angular/core';
import {TimeLineItem} from '../../models';

@Component({
  selector: 'app-time-line-card',
  templateUrl: './time-line-card.component.html',
  styleUrls: ['./time-line-card.component.scss']
})
export class TimeLineCardComponent {
  @Input() public timeLineItem: TimeLineItem;
  public lat = -37.813179;
  public lng = 144.950259;
  public zoom = 12;
  public isShowText: boolean = false;

  public showText(): void {
    this.isShowText = !this.isShowText;
  }
}
