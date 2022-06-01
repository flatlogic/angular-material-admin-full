import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

class DialogData {
  event: string;
}

@Component({
  selector: 'app-new-day-event',
  templateUrl: './new-day-event.component.html',
  styleUrls: ['./new-day-event.component.scss']
})
export class NewDayEventComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<NewDayEventComponent>
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

}
