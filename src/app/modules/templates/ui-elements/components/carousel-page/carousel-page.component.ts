import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from '../../../../../consts';

@Component({
  selector: 'app-carousel-page',
  templateUrl: './carousel-page.component.html',
  styleUrls: ['./carousel-page.component.scss']
})
export class CarouselPageComponent {
  public routes: typeof routes = routes;
  public digCarouselSlides: any[] = [
    {src: './assets/carousel/big-1.png', alt: 'Alaska', text: 'Alaska - Glacier Bay National Park, United States', id: '0'},
    {src: './assets/carousel/big-2.png', alt: 'San Francisco', text: 'San Francisco – Oakland Bay Bridge, United States', id: '1'},
    {src: './assets/carousel/big-3.png', alt: 'Bali', text: 'Bali, Indonesia', id: '2'}
  ];
  public firstSmallCarousel: any[] = [
    {src: './assets/carousel/small-1.png', alt: 'Alaska', text: 'Alaska - Glacier Bay National Park, United States', id: '0'},
    {src: './assets/carousel/small-2.png', alt: 'San Francisco', text: 'San Francisco – Oakland Bay Bridge, United States', id: '1'},
    {src: './assets/carousel/small-3.png', alt: 'Bali', text: 'Bali, Indonesia', id: '2'}
  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoHeight: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
    },
    nav: true
  };
}
