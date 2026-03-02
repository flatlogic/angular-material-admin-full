import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-user-files',
    templateUrl: './user-files.component.html',
    styleUrls: ['./user-files.component.scss'],
    standalone: false
})
export class UserFilesComponent implements OnChanges {
  @Input() isDark: boolean;
  public isDarkMode: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    this.isDarkMode = Boolean(changes['isDark']?.currentValue);
  }
}
