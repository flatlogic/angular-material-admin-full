import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private readonly currentThemeSubject = new BehaviorSubject<string>('blue');
  private readonly currentModeSubject = new BehaviorSubject<string>('light');

  public currentTheme: Observable<string> =
    this.currentThemeSubject.asObservable();
  public currentMode: Observable<string> = this.currentModeSubject.asObservable();

  public setBlueTheme(): void {
    this.currentThemeSubject.next('blue');
  }

  public setPinkTheme(): void {
    this.currentThemeSubject.next('pink');
  }

  public setGreenTheme(): void {
    this.currentThemeSubject.next('green');
  }

  public setDarkMode(value: boolean): void {
    this.currentModeSubject.next(value ? 'dark' : 'light');
  }
}
