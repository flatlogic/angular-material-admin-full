import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [CommonModule, MatIconModule]
})
export class SearchComponent {
  public isShowInput = false;

  public showInput(): void {
    this.isShowInput = true;
  }
}
