import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Users } from '../../../models/users.model';
import { routes } from '../../../../consts';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { SearchComponent } from '../../components/search/search.component';
import { UserComponent } from '../../components/user/user.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      SearchComponent,
      NotificationsComponent,
      UserComponent,
    ]
})
export class HeaderComponent {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user$: Observable<Users>;
  public routers: typeof routes = routes;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.getCurrentUserInfo();
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.authService.logoutUser();

    this.router.navigate([this.routers.LOGIN]);
  }
}
