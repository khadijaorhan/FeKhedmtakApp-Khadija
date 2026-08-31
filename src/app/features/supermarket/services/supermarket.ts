import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';


export interface Product {
  id: string;

  name: string;

  price: number;

  oldPrice?: number;

  image: string;

  category: string;

  description: string;

  rating?: number;

  inStock: boolean;

  [key: string]: any;
}


@Injectable({
  providedIn: 'root'
})
export class SupermarketService {

  private readonly dataUrl =
    '/data/supermarket-products.json';


  readonly categories: string[] = [
    'مشروبات',
    'سناكس',
    'منتجات ألبان',
    'مخبوزات',
    'فواكه',
    'خضروات',
    'مجمدات',
    'معلبات',
    'منظفات منزلية',
    'عناية شخصية'
  ];


  constructor(
    private http: HttpClient
  ) {}


  getProducts():
    Observable<Product[]> {

    return this.http.get<Product[]>(
      this.dataUrl
    );
  }


  getProductById(
    id: string
  ): Observable<Product | undefined> {

    return this.getProducts()
      .pipe(
        map(
          products =>
            products.find(
              product =>
                product.id === id
            )
        )
      );
  }


  getProductsByCategory(
    category: string
  ): Observable<Product[]> {

    if (
      !category ||
      category === 'الكل'
    ) {

      return this.getProducts();
    }


    return this.getProducts()
      .pipe(
        map(
          products =>
            products.filter(
              product =>
                product.category ===
                category
            )
        )
      );
  }


  searchProducts(
    query: string
  ): Observable<Product[]> {

    const term =
      query
        .trim()
        .toLowerCase();


    if (!term) {

      return this.getProducts();
    }


    return this.getProducts()
      .pipe(
        map(
          products =>
            products.filter(
              product =>

                product.name
                  .toLowerCase()
                  .includes(term)

                ||

                product.description
                  .toLowerCase()
                  .includes(term)
            )
        )
      );
  }


  getOffers():
    Observable<Product[]> {

    return this.getProducts()
      .pipe(
        map(
          products =>
            products.filter(
              product =>
                !!product.oldPrice &&
                product.oldPrice >
                product.price
            )
        )
      );
  }


  getFeaturedProducts():
    Observable<Product[]> {

    return this.getProducts()
      .pipe(
        map(
          products =>
            products.filter(
              product =>
                (
                  product.rating ??
                  0
                ) >= 4.7
            )
        )
      );
  }

}