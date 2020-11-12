import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { finalize, flatMap, map, share, toArray } from 'rxjs/operators';
import { string } from '@amcharts/amcharts4/core';

export class Product {
  id?: number;
  img?: string;
  title?: string;
  subtitle?: string;
  price?: number;
  rating?: number;
  description_1?: string;
  description_2?: string;
  code?: number;
  hashtag?: string;
  technology?: string[];
  discount?: number;
  status?: string = "New";

  constructor(id?) {
    if (id) {
      this.id = id;
    }
    this.img = '';
    this.title = '';
    this.subtitle = '';
    this.price = 0.01;
    this.rating = 5;
    this.description_1 = '';
    this.description_2 = '';
    this.code = null;
    this.hashtag = '';
    this.technology = [];
    this.discount = 0;
    this.status = "New";
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  config: any;
  _isCreating: boolean = false;
  _isReceiving: boolean = false;
  _isUpdating: boolean = false;
  _isDeleting: boolean = false;
  _isRetrievingProductImage: boolean = false;

  public products$: Observable<Product[]>;
  public product$: Observable<Product>;

  constructor(
    private http: HttpClient,
    private router: Router,
    appConfig: AppConfig
  ) {
    this.config = appConfig.getConfig();
  }

  public setImgField(product: any) {
    if (!product) return {};
    let imgString = '';
    let resourceApi = (this.config.resourceApi) ? this.config.resourceApi : '';

    if (product.img) {
      imgString = product.img;
    }

    return {
      ...product,
      img: resourceApi + imgString
    }
  }

  getProducts(isForced: boolean = false) {
    this.startGetProducts();
    this.products$ = this.http.get<Array<Product>>('/products')
      .pipe(
        flatMap(data => data),
        map(product => this.setImgField(product)),
        toArray(),
        share(),
        finalize(() => this.finishGetProducts())
      );
    return this.products$;
  }

  getProduct(id, isForced: boolean = false) {
    this.startGetProducts();
    return this.product$ = this.http.get<Product>('/products/' + id)
      .pipe(
        map(product => this.setImgField(product)),
        share(),
        finalize(() => this.finishGetProducts())
      );
  }

  updateProduct(payload: Product) {
    if (!payload) return;

    if (!Array.isArray(payload.technology)) {
      if (typeof (payload.technology) === "string") {
        payload.technology = (payload.technology as string).split(',');
      } else {
        payload.technology = [];
      }
    }

    this.startUpdatingProduct();
    return this.http.put('/products/' + payload.id, payload)
      .pipe(
        finalize(() => this.finishUpdatingProduct())
      );
  }

  createProduct(payload: Product) {
    if (!payload) return;

    if (!Array.isArray(payload.technology)) {
      if (typeof (payload.technology) === "string") {
        payload.technology = (payload.technology as string).split(',');
      } else {
        payload.technology = [];
      }
    }

    this.startCreatingProduct();
    return this.http.post('/products', payload)
      .pipe(
        finalize(() => this.finishCreatingProduct())
      );
  }

  deleteProduct(id) {
    this.startDeletingProduct();
    return this.http.delete('/products/' + id)
      .pipe(
        finalize(() => this.finishDeletingProduct())
      );
  }

  getProductImages() {
    this.startRetrievingProductImages()
    return this.http.get<Array<string>>('/products/images-list')
      .pipe(
        flatMap(data => data),
        map(img => {
          if (!img) return '';

          let resourceApi = (this.config.resourceApi) ? this.config.resourceApi : '';
          return `${resourceApi}${img}`;
        }),
        toArray(),
        share(),
        finalize(() => this.finishRetrievingProductImages())
      );
  }

  startGetProducts() {
    this.isReceiving = true;
  }

  startRetrievingProductImages() {
    this.isRetrievingProductImage = true;
  }

  startUpdatingProduct() {
    this.isUpdating = true;
  }

  startDeletingProduct() {
    this.isDeleting = true;
  }

  startCreatingProduct() {
    this.isCreating = true;
  }

  finishGetProducts() {
    this.isReceiving = false;
  }

  finishRetrievingProductImages() {
    this.isRetrievingProductImage = false;
  }

  finishUpdatingProduct() {
    this.isUpdating = false;
  }

  finishCreatingProduct() {
    this.isCreating = false;
  }

  finishDeletingProduct() {
    this.isDeleting = false;
  }

  get isCreating() {
    return this._isCreating;
  }

  set isCreating(isCreating) {
    this._isCreating = isCreating;
  }

  get isReceiving() {
    return this._isReceiving;
  }

  set isReceiving(isReceiving) {
    this._isReceiving = isReceiving;
  }

  get isUpdating() {
    return this._isUpdating;
  }

  set isUpdating(isUpdating) {
    this._isUpdating = isUpdating;
  }

  get isDeleting() {
    return this._isDeleting;
  }

  set isDeleting(isDeleting) {
    this._isDeleting = isDeleting;
  }

  get isRetrievingProductImage() {
    return this._isRetrievingProductImage;
  }

  set isRetrievingProductImage(newIsRetrievingProductImage) {
    this._isRetrievingProductImage = newIsRetrievingProductImage;
  }
}
