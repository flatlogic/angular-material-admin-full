import { Component, EventEmitter, Output } from '@angular/core';
import { routes } from '../../consts/routes';

@Component({
  selector: 'app-settings-menu-app',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuAppComponent {
  public routes: typeof routes = routes;

  @Output() themeOnBlue: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() themeOnPink: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() themeOnGreen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() darkMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isDarkMode: boolean = false;

  public isBlueTheme: boolean = true;
  public isPinkTheme: boolean = false;
  public isGreenTheme: boolean = false;

  public changeThemeOnBlue(): void {
    this.isBlueTheme = true;
    this.isPinkTheme = false;
    this.isGreenTheme = false;

    this.themeOnBlue.emit(true);
  }
  public changeThemeOnPink(): void {
    this.isBlueTheme = false;
    this.isPinkTheme = true;
    this.isGreenTheme = false;

    this.themeOnPink.emit(true);
  }
  public changeThemeOnGreen(): void {
    this.isBlueTheme = false;
    this.isPinkTheme = false;
    this.isGreenTheme = true;

    this.themeOnGreen.emit(true);
  }

  public onDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.darkMode.emit(this.isDarkMode);
  }
}
