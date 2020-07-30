import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-popup',
  templateUrl: './delete-user-popup.component.html',
  styleUrls: ['./delete-user-popup.component.scss']
})
export class DeleteUserPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserPopupComponent>,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
