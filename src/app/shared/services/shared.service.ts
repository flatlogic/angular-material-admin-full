import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private updateThemeObservable;
  private updateModeObservable;
  private current: string = 'blue';
  private mode: string = 'light';

  public currentTheme = new Observable<string>((observer: any) => {
    observer.next(this.current);

    this.updateThemeObservable = function (newValue) {
      observer.next(newValue);
    };
  });

  public currentMode = new Observable<string>((observer: any) => {
    observer.next(this.mode);

    this.updateModeObservable = function (newValue) {
      observer.next(newValue);
    };
  });

  public setBlueTheme(): void {
    this.current = 'blue';

    this.updateThemeObservable('blue');
  }

  public setPinkTheme(): void {
    this.current = 'pink';

    this.updateThemeObservable('pink');
  }

  public setGreenTheme(): void {
    this.current = 'green';

    this.updateThemeObservable('green');
  }

  public setDarkMode(value: boolean): void {
    this.mode = value ? 'dark' : 'light';

    this.updateModeObservable(this.mode);
  }
}
