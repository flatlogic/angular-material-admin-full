import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ProductDetails} from '../models/product-details';
import {ProductCard} from '../models';

let products: ProductDetails[] = [
  {
    id: '1',
    image: './assets/e-commerce/products/1.png',
    imageLarge: './assets/e-commerce/products/large-1.png',
    imageSmall: './assets/e-commerce/managment/1.png',
    title: 'Trainers',
    subtitle: 'Trainers in white',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135234',
    discount: '20',
    price: '$80',
    rating: '4.6',
    status: 'New'
  },
  {
    id: '2',
    image: './assets/e-commerce/products/2.png',
    imageLarge: './assets/e-commerce/products/large-2.png',
    imageSmall: './assets/e-commerce/managment/2.png',
    title: 'Boots',
    subtitle: 'Trainers in blue',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135264',
    discount: '20',
    price: '$37',
    rating: '4.6',
    status: 'Sale'
  },
  {
    id: '3',
    image: './assets/e-commerce/products/3.png',
    imageLarge: './assets/e-commerce/products/large-3.png',
    imageSmall: './assets/e-commerce/managment/3.png',
    title: 'Flat sandals',
    subtitle: 'Trainers in white',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '125234',
    discount: '20',
    price: '$70',
    rating: '4.6',
    status: 'New'
  },
  {
    id: '4',
    image: './assets/e-commerce/products/4.png',
    imageLarge: './assets/e-commerce/products/large-4.png',
    imageSmall: './assets/e-commerce/managment/4.png',
    title: 'Trainers',
    subtitle: 'Trainers in blue',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '133234',
    discount: '20',
    price: '$85',
    rating: '4.6',
    status: 'Sale'
  },
  {
    id: '5',
    image: './assets/e-commerce/products/5.png',
    imageLarge: './assets/e-commerce/products/large-5.png',
    imageSmall: './assets/e-commerce/managment/5.png',
    title: 'Flat sandals',
    subtitle: 'Trainers in white',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '138234',
    discount: '20',
    price: '$12',
    rating: '4.6',
    status: 'New'
  },
  {
    id: '6',
    image: './assets/e-commerce/products/6.png',
    imageLarge: './assets/e-commerce/products/large-6.png',
    imageSmall: './assets/e-commerce/managment/6.png',
    title: 'Flat sandals',
    subtitle: 'Trainers in blue',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135237',
    discount: '20',
    price: '$76',
    rating: '4.6',
    status: 'Sale'
  },
  {
    id: '7',
    image: './assets/e-commerce/products/1.png',
    imageLarge: './assets/e-commerce/products/large-1.png',
    imageSmall: './assets/e-commerce/managment/1.png',
    title: 'Trainers',
    subtitle: 'Trainers in white',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135234',
    discount: '20',
    price: '$80',
    rating: '4.6',
    status: 'New'
  },
  {
    id: '8',
    image: './assets/e-commerce/products/2.png',
    imageLarge: './assets/e-commerce/products/large-2.png',
    imageSmall: './assets/e-commerce/managment/2.png',
    title: 'Boots',
    subtitle: 'Trainers in blue',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135264',
    discount: '20',
    price: '$37',
    rating: '4.6',
    status: 'Sale'
  },
  {
    id: '9',
    image: './assets/e-commerce/products/3.png',
    imageLarge: './assets/e-commerce/products/large-3.png',
    imageSmall: './assets/e-commerce/managment/3.png',
    title: 'Flat sandals',
    subtitle: 'Trainers in white',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '125234',
    discount: '20',
    price: '$70',
    rating: '4.6',
    status: 'New'
  },
  {
    id: '10',
    image: './assets/e-commerce/products/4.png',
    imageLarge: './assets/e-commerce/products/large-4.png',
    imageSmall: './assets/e-commerce/managment/4.png',
    title: 'Trainers',
    subtitle: 'Trainers in blue',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '133234',
    discount: '20',
    price: '$85',
    rating: '4.6',
    status: 'Sale'
  },
  {
    id: '11',
    image: './assets/e-commerce/products/5.png',
    imageLarge: './assets/e-commerce/products/large-5.png',
    imageSmall: './assets/e-commerce/managment/5.png',
    title: 'Flat sandals',
    subtitle: 'Trainers in white',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '138234',
    discount: '20',
    price: '$12',
    rating: '4.6',
    status: 'New'
  },
  {
    id: '12',
    image: './assets/e-commerce/products/6.png',
    imageLarge: './assets/e-commerce/products/large-6.png',
    imageSmall: './assets/e-commerce/managment/6.png',
    title: 'Flat sandals',
    subtitle: 'Trainers in blue',
    description1: 'Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies,' +
      ' or trainers) are shoes primarily designed for sports or other forms of physical exercise, but' +
      ' which are now also often used for everyday wear.',
    description2: 'The term generally describes a type of footwear with a flexible sole made of rubber' +
      ' or synthetic material and an upper part made of leather or synthetic materials.',
    technology: ['Ollie patch', 'Cup soles', 'Vulcanized rubber soles'],
    hashtag: '#whitetrainers',
    code: '135237',
    discount: '20',
    price: '$76',
    rating: '4.6',
    status: 'Sale'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public getProducts(): Observable<ProductDetails[]> {
    return of(products);
  }

  public getProduct(id: string): Observable<ProductDetails> {
    return of(products.find((product: ProductDetails) => product.id === id));
  }

  public saveChangedProduct(editProduct: ProductDetails) {
    products.map((product: ProductDetails, i: number) => {
      if (product.id === editProduct.id) {
        products.splice(i, 1, editProduct);
      }
    });
  }

  public deleteProduct(id: string): void {
    products.map((product: ProductDetails, i: number) => {
      if (product.id === id) {
        products.splice(i, 1);
      }
    });
  }

  public getSimilarProducts(): Observable<ProductCard[]> {
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
      }
    ]);
  }

  public createProduct(product: ProductDetails): void {
    products.push(product);
  }
}
