import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import {color} from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

import {colors, routes} from '../../../../../consts';

@Component({
  selector: 'app-vector-map-page',
  templateUrl: './vector-map-page.component.html',
  styleUrls: ['./vector-map-page.component.scss']
})
export class VectorMapPageComponent implements AfterViewInit {
  @ViewChild('chartdiv', { static: false }) public mapChart: ElementRef<HTMLElement>;
  public colors: typeof colors = colors;
  public routes: typeof routes = routes;

  public ngAfterViewInit() {
    let chart = am4core.create(this.mapChart.nativeElement, am4maps.MapChart);

// Set map definition
    chart.geodata = am4geodata_worldLow;

// Set projection
    chart.projection = new am4maps.projections.Miller();

// Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
    polygonSeries.exclude = ["AQ"];

// Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

// Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.properties.fillOpacity = 0.2;
    polygonTemplate.properties.fill = color(colors.BLUE);


// Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = color(colors.BLUE);
    hs.properties.fillOpacity = 1;

// Add image series
    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "{title}";
    imageSeries.mapImages.template.fill = color(colors.BLUE);

    let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 5;
    circle.fill = color(colors.BLUE);
    circle.stroke = color('#fff');
    circle.strokeWidth = 2;

    // let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    // circle2.radius = 3;
    // circle2.propertyFields.fill = "color";
    //
    //
    // circle2.events.on("inited", function(event){
    //   animateBullet(event.target);
    // })
    //
    //
    // function animateBullet(circle) {
    //   let animation = circle.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
    //   animation.events.on("animationended", function(event){
    //     animateBullet(event.target.object);
    //   })
    // }

    imageSeries.data = [ {
      "title": "Brussels",
      "latitude": 50.8371,
      "longitude": 4.3676
    }, {
      "title": "Copenhagen",
      "latitude": 55.6763,
      "longitude": 12.5681
    }, {
      "title": "Paris",
      "latitude": 48.8567,
      "longitude": 2.3510
    }, {
      "title": "Reykjavik",
      "latitude": 64.1353,
      "longitude": -21.8952
    }, {
      "title": "Moscow",
      "latitude": 55.7558,
      "longitude": 37.6176
    }, {
      "title": "Madrid",
      "latitude": 40.4167,
      "longitude": -3.7033
    }, {
      "title": "London",
      "latitude": 51.5002,
      "longitude": -0.1262
    }, {
      "title": "Peking",
      "latitude": 39.9056,
      "longitude": 116.3958
    }, {
      "title": "New Delhi",
      "latitude": 28.6353,
      "longitude": 77.2250
    }, {
      "title": "Tokyo",
      "latitude": 35.6785,
      "longitude": 139.6823
    }, {
      "title": "Ankara",
      "latitude": 39.9439,
      "longitude": 32.8560
    }, {
      "title": "Buenos Aires",
      "latitude": -34.6118,
      "longitude": -58.4173
    }, {
      "title": "Brasilia",
      "latitude": -15.7801,
      "longitude": -47.9292
    }, {
      "title": "Ottawa",
      "latitude": 45.4235,
      "longitude": -75.6979
    }, {
      "title": "Washington",
      "latitude": 38.8921,
      "longitude": -77.0241
    }, {
      "title": "Kinshasa",
      "latitude": -4.3369,
      "longitude": 15.3271
    }, {
      "title": "Cairo",
      "latitude": 30.0571,
      "longitude": 31.2272
    }, {
      "title": "Pretoria",
      "latitude": -25.7463,
      "longitude": 28.1876
    } ];
  }
}
