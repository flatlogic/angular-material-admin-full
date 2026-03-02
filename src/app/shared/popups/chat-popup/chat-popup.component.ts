import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-chat-popup',
    templateUrl: './chat-popup.component.html',
    styleUrls: ['./chat-popup.component.scss'],
    standalone: true,
    imports: [
      FormsModule,
      MatButtonModule,
      MatDialogModule,
      MatIconModule,
    ]
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
    if (!this.message?.trim()) {
      return;
    }

    const chat =     {
      imgUrl: './assets/header/avatar.png',
      userName: 'Robbert Cotton',
      message: this.message.trim()
    };
    this.chatList.push(chat);
    this.message = '';
  }
}
