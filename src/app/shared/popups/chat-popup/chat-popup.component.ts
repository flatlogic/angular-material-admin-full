import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss']
})
export class ChatPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<ChatPopupComponent>,
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

}
