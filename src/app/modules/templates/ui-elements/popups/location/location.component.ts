import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  constructor(
    public dialogRef: MatDialogRef<LocationComponent>
  ) { }

  public close(): void {
    this.dialogRef.close();
  }
}
