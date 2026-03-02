import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

type SubscriptionDialogData = {
  email: string;
};

@Component({
    selector: 'app-subscribed',
    templateUrl: './subscribed.component.html',
    styleUrls: ['./subscribed.component.scss'],
    standalone: false
})
export class SubscribedComponent {

  constructor(
    public dialogRef: MatDialogRef<SubscribedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubscriptionDialogData
  ) { }

  public close(): void {
    this.dialogRef.close();
  }

}
