import { Component } from '@angular/core';

import { routes } from '../../../../../consts';
import { Observable } from 'rxjs';
import { TimeLineItem } from '../../models';
import { TimeLineService } from '../../services';

@Component({
  selector: 'app-time-line-page',
  templateUrl: './time-line-page.component.html',
  styleUrls: ['./time-line-page.component.scss']
})
export class TimeLinePageComponent {
  public routes: typeof routes = routes;
  public timeLineData$: Observable<TimeLineItem[]>;

  constructor(private service: TimeLineService) {
    this.timeLineData$  = service.getTimeLineData();
  }
}
