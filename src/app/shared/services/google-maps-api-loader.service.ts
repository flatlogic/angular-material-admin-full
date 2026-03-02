import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsApiLoaderService {
  private readonly scriptSelector = 'script[data-google-maps-api="true"]';
  private loadPromise: Promise<void> | null = null;

  public load(apiKey: string): Promise<void> {
    const mapsWindow = window as Window & { google?: { maps?: unknown } };
    if (mapsWindow.google?.maps) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector(
        this.scriptSelector,
      ) as HTMLScriptElement | null;

      if (existingScript) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve();
          return;
        }
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.setAttribute('data-google-maps-api', 'true');
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve();
      };
      script.onerror = () => {
        this.loadPromise = null;
        script.remove();
        reject(new Error('Failed to load Google Maps API.'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }
}
