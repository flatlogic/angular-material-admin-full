import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-long-content',
  templateUrl: './long-content.component.html',
  styleUrls: ['./long-content.component.scss']
})
export class LongContentComponent {

  constructor(
    public dialogRef: MatDialogRef<LongContentComponent>
  ) { }

  public close(): void {
    this.dialogRef.close();
  }
}
