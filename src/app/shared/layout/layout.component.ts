import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from '../services/shared.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/containers/header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { SettingsMenuAppComponent } from '../settings-menu/settings-menu.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      MatSidenavModule,
      RouterModule,
      HeaderComponent,
      SidebarComponent,
      FooterComponent,
      SettingsMenuAppComponent,
    ]
})
export class LayoutComponent implements OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  public isShowSidebar: boolean;
  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private service: SharedService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    this.isShowSidebar = !this.mobileQuery.matches;
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);

    this.sidenav?.close();
  }

  public isBlueTheme: boolean = true;
  public isPinkTheme: boolean = false;
  public isGreenTheme: boolean = false;
  public isDarkMode: boolean = false;

  public changeThemeOnBlue(): void {
    this.isBlueTheme = true;
    this.isPinkTheme = false;
    this.isGreenTheme = false;

    this.service.setBlueTheme();
  }
  public changeThemeOnPink(): void {
    this.isBlueTheme = false;
    this.isPinkTheme = true;
    this.isGreenTheme = false;

    this.service.setPinkTheme();
  }
  public changeThemeOnGreen(): void {
    this.isBlueTheme = false;
    this.isPinkTheme = false;
    this.isGreenTheme = true;

    this.service.setGreenTheme();
  }
  public onDarkMode(value: boolean): void {
    this.isDarkMode = value;

    this.service.setDarkMode(value);
  }
}
