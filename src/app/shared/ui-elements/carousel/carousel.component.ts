import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import Swiper from 'swiper';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface CarouselSlide {
  src: string;
  alt: string;
  text?: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class CarouselComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() slides: CarouselSlide[] = [];
  @Input() aspectRatio = '16 / 10';
  @Input() loop = true;
  @Input() showNavigation = true;
  @Input() showPagination = true;
  @Input() speed = 700;

  @ViewChild('swiperContainer', { static: true }) private swiperContainer!: ElementRef<HTMLDivElement>;

  private swiperInstance?: Swiper;

  public ngAfterViewInit(): void {
    this.createSwiper();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.swiperContainer?.nativeElement) {
      return;
    }

    if (
      changes['slides'] ||
      changes['loop'] ||
      changes['showNavigation'] ||
      changes['showPagination'] ||
      changes['speed']
    ) {
      this.recreateSwiper();
    }
  }

  public ngOnDestroy(): void {
    this.destroySwiper();
  }

  public trackBySlide(_index: number, slide: CarouselSlide): string {
    return `${slide.src}-${slide.alt}`;
  }

  private recreateSwiper(): void {
    this.destroySwiper();
    this.createSwiper();
  }

  private createSwiper(): void {
    const container = this.swiperContainer?.nativeElement;
    if (!container || this.slides.length === 0) {
      return;
    }

    const prevEl = container.querySelector('.shared-carousel__prev') as HTMLElement | null;
    const nextEl = container.querySelector('.shared-carousel__next') as HTMLElement | null;
    const paginationEl = container.querySelector('.shared-carousel__pagination') as HTMLElement | null;

    this.swiperInstance = new Swiper(container, {
      modules: [Navigation, Pagination, A11y],
      slidesPerView: 1,
      loop: this.loop && this.slides.length > 1,
      speed: this.speed,
      navigation: this.showNavigation && prevEl && nextEl ? { prevEl, nextEl } : false,
      pagination: this.showPagination && paginationEl ? { el: paginationEl, clickable: true } : false,
      a11y: {
        enabled: true
      }
    });
  }

  private destroySwiper(): void {
    if (!this.swiperInstance) {
      return;
    }

    this.swiperInstance.destroy(true, true);
    this.swiperInstance = undefined;
  }
}
