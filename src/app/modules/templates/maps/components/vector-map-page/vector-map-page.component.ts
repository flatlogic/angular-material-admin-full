import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { colors, routes } from '../../../../../consts';

type LeafletModule = typeof import('leaflet');
type LeafletMap = import('leaflet').Map;
type LeafletLayerGroup = import('leaflet').LayerGroup;

interface CityMarker {
  title: string;
  latitude: number;
  longitude: number;
}

const CITY_MARKERS: CityMarker[] = [
  { title: 'Brussels', latitude: 50.8371, longitude: 4.3676 },
  { title: 'Copenhagen', latitude: 55.6763, longitude: 12.5681 },
  { title: 'Paris', latitude: 48.8567, longitude: 2.3510 },
  { title: 'Reykjavik', latitude: 64.1353, longitude: -21.8952 },
  { title: 'Moscow', latitude: 55.7558, longitude: 37.6176 },
  { title: 'Madrid', latitude: 40.4167, longitude: -3.7033 },
  { title: 'London', latitude: 51.5002, longitude: -0.1262 },
  { title: 'Peking', latitude: 39.9056, longitude: 116.3958 },
  { title: 'New Delhi', latitude: 28.6353, longitude: 77.2250 },
  { title: 'Tokyo', latitude: 35.6785, longitude: 139.6823 },
  { title: 'Ankara', latitude: 39.9439, longitude: 32.8560 },
  { title: 'Buenos Aires', latitude: -34.6118, longitude: -58.4173 },
  { title: 'Brasilia', latitude: -15.7801, longitude: -47.9292 },
  { title: 'Ottawa', latitude: 45.4235, longitude: -75.6979 },
  { title: 'Washington', latitude: 38.8921, longitude: -77.0241 },
  { title: 'Kinshasa', latitude: -4.3369, longitude: 15.3271 },
  { title: 'Cairo', latitude: 30.0571, longitude: 31.2272 },
  { title: 'Pretoria', latitude: -25.7463, longitude: 28.1876 },
];

@Component({
  selector: 'app-vector-map-page',
  templateUrl: './vector-map-page.component.html',
  styleUrls: ['./vector-map-page.component.scss'],
  standalone: false
})
export class VectorMapPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartdiv', { static: false }) public mapChart?: ElementRef<HTMLElement>;

  public routes: typeof routes = routes;
  public colors: typeof colors = colors;

  private leaflet?: LeafletModule;
  private map?: LeafletMap;
  private markersLayer?: LeafletLayerGroup;

  public ngAfterViewInit(): void {
    void this.initializeMap();
  }

  public ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  private async initializeMap(): Promise<void> {
    if (!this.mapChart?.nativeElement || this.map) {
      return;
    }

    if (!this.leaflet) {
      this.leaflet = await import('leaflet');
    }

    const L = this.leaflet;

    this.map = L.map(this.mapChart.nativeElement, {
      zoomControl: true,
      minZoom: 2,
      maxZoom: 6,
      worldCopyJump: true
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);

    CITY_MARKERS.forEach((city) => {
      L.circleMarker([city.latitude, city.longitude], {
        radius: 6,
        color: '#ffffff',
        weight: 2,
        fillColor: colors.BLUE,
        fillOpacity: 1
      })
        .bindTooltip(city.title, { direction: 'top', offset: [0, -6] })
        .addTo(this.markersLayer as LeafletLayerGroup);
    });

    setTimeout(() => this.map?.invalidateSize(), 0);
  }
}
