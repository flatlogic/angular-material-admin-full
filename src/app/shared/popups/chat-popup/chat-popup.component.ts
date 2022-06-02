import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss']
})
export class ChatPopupComponent {
  message: string;
  chatList = [
    {
      imgUrl: './assets/sidebar/2.png',
      userName: 'Jane Hew',
      message: 'Hey! How it\'s going?'
    },
    {
      imgUrl: './assets/sidebar/3.png',
      userName: 'Axel Pittman',
      message: 'I\'ll definitely buy this template'
    },
    {
      imgUrl: './assets/sidebar/5.png',
      userName: 'Sophia Fernandez',
      message: 'What\'s the font-family?'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<ChatPopupComponent>,
  ) {}

  public close(): void {
    this.dialogRef.close();
  }

  send(): void {
    const chat =     {
      imgUrl: './assets/header/avatar.png',
      userName: 'Robbert Cotton',
      message: this.message
    };
    this.chatList.push(chat);
    this.message = '';
  }
}
