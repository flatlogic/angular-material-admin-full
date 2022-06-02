import { Component } from '@angular/core';
import {routes} from '../../../../../consts';

@Component({
  selector: 'app-carousel-page',
  templateUrl: './carousel-page.component.html',
  styleUrls: ['./carousel-page.component.scss']
})
export class CarouselPageComponent {
  public routes: typeof routes = routes;
  public digCarouselSlides: any[] = [
    {image: './assets/carousel/big-1.png', text: 'Alaska - Glacier Bay National Park, United States'},
    {image: './assets/carousel/big-2.png', text: 'San Francisco – Oakland Bay Bridge, United States'},
    {image: './assets/carousel/big-3.png', text: 'Bali, Indonesia'}
  ];
  public firstSmallCarousel: any[] = [
    {image: './assets/carousel/small-1.png', text: 'Alaska - Glacier Bay National Park, United States'},
    {image: './assets/carousel/small-2.png', text: 'San Francisco – Oakland Bay Bridge, United States'},
    {image: './assets/carousel/small-3.png', text: 'Bali, Indonesia'}
  ]
}
