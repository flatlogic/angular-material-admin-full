import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Users } from '../../../models/users.model';

import { routes } from '../../../../consts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: Users;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public routes: typeof routes = routes;
  public flatlogicEmail: string = 'https://flatlogic.com';

  public signOutEmit(): void {
    this.signOut.emit();
  }

  firstUserLetter() {
    return (this.user?.firstName || this.user?.email || 'P')[0].toUpperCase();
  }

  avatar() {
    return this.user && this.user.avatar && this.user.avatar.length
      ? this.user.avatar[0].publicUrl
      : './assets/profile.png';
  }
}
