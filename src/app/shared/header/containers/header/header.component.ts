import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Email, User } from '../../../../modules/auth/models';
import { AuthService, EmailService } from '../../../../modules/auth/services';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user$: Observable<User>
  public emails$: Observable<Email[]>
  public routers: typeof routes = routes;

  constructor(
    private userService: AuthService,
    private emailService: EmailService,
    private router: Router
  ) {
    this.user$ = this.userService.getUser();
    this.emails$ = this.emailService.loadEmails();
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.userService.logoutUser();

    this.router.navigate([this.routers.LOGIN]);
  }
}
