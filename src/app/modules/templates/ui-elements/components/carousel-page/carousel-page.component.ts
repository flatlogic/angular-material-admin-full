import { Component } from '@angular/core';
import { routes } from '../../../../../consts';
import { CarouselSlide } from '../../../../../shared/ui-elements';

@Component({
    selector: 'app-carousel-page',
    templateUrl: './carousel-page.component.html',
    styleUrls: ['./carousel-page.component.scss'],
    standalone: false
})
export class CarouselPageComponent {
  public routes: typeof routes = routes;
  public digCarouselSlides: CarouselSlide[] = [
    {src: './assets/carousel/big-1.png', alt: 'Alaska', text: 'Alaska - Glacier Bay National Park, United States'},
    {src: './assets/carousel/big-2.png', alt: 'San Francisco', text: 'San Francisco – Oakland Bay Bridge, United States'},
    {src: './assets/carousel/big-3.png', alt: 'Bali', text: 'Bali, Indonesia'}
  ];
  public firstSmallCarousel: CarouselSlide[] = [
    {src: './assets/carousel/small-1.png', alt: 'Alaska', text: 'Alaska - Glacier Bay National Park, United States'},
    {src: './assets/carousel/small-2.png', alt: 'San Francisco', text: 'San Francisco – Oakland Bay Bridge, United States'},
    {src: './assets/carousel/small-3.png', alt: 'Bali', text: 'Bali, Indonesia'}
  ];
}
