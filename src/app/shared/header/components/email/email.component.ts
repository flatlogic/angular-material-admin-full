import { Component, Input } from '@angular/core';

import { Email } from '../../../../modules/auth/models';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  @Input() emails: Email[];
  public colors: string[] = [
    'yellow',
    'green',
    'blue',
    'ping'
  ];
}
