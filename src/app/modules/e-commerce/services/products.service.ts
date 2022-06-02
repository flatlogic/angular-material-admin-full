import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {ProductCard} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public getProducts(): Observable<ProductCard[]> {
    return of([
      {
        id: '1',
        image: './assets/e-commerce/products/1.png',
        title: 'Trainers',
        subtitle: 'Trainers in white',
        price: '$80',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '2',
        image: './assets/e-commerce/products/2.png',
        title: 'Boots',
        subtitle: 'Trainers in blue',
        price: '$37',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '3',
        image: './assets/e-commerce/products/3.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in white',
        price: '$70',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '4',
        image: './assets/e-commerce/products/4.png',
        title: 'Trainers',
        subtitle: 'Trainers in blue',
        price: '$85',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '5',
        image: './assets/e-commerce/products/5.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in white',
        price: '$12',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '6',
        image: './assets/e-commerce/products/6.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in blue',
        price: '$76',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '7',
        image: './assets/e-commerce/products/1.png',
        title: 'Trainers',
        subtitle: 'Trainers in white',
        price: '$80',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '8',
        image: './assets/e-commerce/products/2.png',
        title: 'Boots',
        subtitle: 'Trainers in blue',
        price: '$37',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '9',
        image: './assets/e-commerce/products/3.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in white',
        price: '$70',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '10',
        image: './assets/e-commerce/products/4.png',
        title: 'Trainers',
        subtitle: 'Trainers in blue',
        price: '$85',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '11',
        image: './assets/e-commerce/products/5.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in white',
        price: '$12',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '12',
        image: './assets/e-commerce/products/6.png',
        title: 'Flat sandals',
        subtitle: 'Trainers in blue',
        price: '$76',
        rating: '4.6',
        status: 'Sale'
      }
    ]);
  }

  public getSimilarProducts(): Observable<ProductCard[]> {
    return of([
      {
        id: '1',
        image: './assets/e-commerce/products/1.jpg',
        title: 'Trainers',
        subtitle: 'Trainers in white',
        price: '$80',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '2',
        image: './assets/e-commerce/products/2.jpg',
        title: 'Boots',
        subtitle: 'Trainers in blue',
        price: '$37',
        rating: '4.6',
        status: 'Sale'
      },
      {
        id: '3',
        image: './assets/e-commerce/products/3.jpg',
        title: 'Flat sandals',
        subtitle: 'Trainers in white',
        price: '$70',
        rating: '4.6',
        status: 'New'
      },
      {
        id: '4',
        image: './assets/e-commerce/products/4.jpg',
        title: 'Trainers',
        subtitle: 'Trainers in blue',
        price: '$85',
        rating: '4.6',
        status: 'Sale'
      }
    ]);
  }
}
