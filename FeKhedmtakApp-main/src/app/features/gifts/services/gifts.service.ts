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

import {
  GiftCategory,
  GiftOccasion,
  GiftProduct,
  GiftRecipient
} from '../models/gift.model';

import {
  GiftBoxOption,
  GreetingCardOption,
  WrappingOption
} from '../models/gift-box.model';


interface GiftCategoryApi {
  id: string;
  name: string;
  icon: string;
}


@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  private readonly apiUrl =
    'http://localhost:3000';


  private selectedProducts:
    GiftProduct[] = [];


  private selectedBox:
    GiftBoxOption | null = null;


  constructor(
    private http: HttpClient
  ) {}


  getProducts():
    Observable<GiftProduct[]> {

    return this.http.get<GiftProduct[]>(
      `${this.apiUrl}/products`
    );
  }


  getProductById(
    id: string
  ): Observable<GiftProduct | null> {

    return this.http
      .get<GiftProduct[]>(
        `${this.apiUrl}/products?id=${id}`
      )
      .pipe(
        map(
          products =>
            products.length > 0
              ? products[0]
              : null
        )
      );
  }


  getProductsByCategory(
    category: GiftCategory
  ): Observable<GiftProduct[]> {

    return this.http.get<GiftProduct[]>(
      `${this.apiUrl}/products?category=${category}`
    );
  }


  getRecommendedProducts(
    recipient: GiftRecipient,
    occasion: GiftOccasion
  ): Observable<GiftProduct[]> {

    return this.getProducts().pipe(

      map(
        products =>
          products.filter(
            product =>
              product.suitableFor.includes(
                recipient
              ) &&
              product.occasions.includes(
                occasion
              )
          )
      )

    );
  }


  getCategories():
    Observable<GiftCategoryApi[]> {

    return this.http.get<
      GiftCategoryApi[]
    >(
      `${this.apiUrl}/categories`
    );
  }


  getBoxes():
    Observable<GiftBoxOption[]> {

    return this.http.get<
      GiftBoxOption[]
    >(
      `${this.apiUrl}/boxes`
    );
  }


  getWrappings():
    Observable<WrappingOption[]> {

    return this.http.get<
      WrappingOption[]
    >(
      `${this.apiUrl}/wrappings`
    );
  }


  getGreetingCards():
    Observable<GreetingCardOption[]> {

    return this.http.get<
      GreetingCardOption[]
    >(
      `${this.apiUrl}/greetingCards`
    );
  }


  filterProducts(
    products: GiftProduct[],
    searchTerm: string,
    category: GiftCategory | 'all',
    minPrice: number | null,
    maxPrice: number | null
  ): GiftProduct[] {

    let result =
      [...products];


    const search =
      searchTerm
        .trim()
        .toLowerCase();


    if (search) {

      result =
        result.filter(
          product =>
            product.name
              .toLowerCase()
              .includes(search)
            ||
            product.description
              .toLowerCase()
              .includes(search)
        );
    }


    if (category !== 'all') {

      result =
        result.filter(
          product =>
            product.category === category
        );
    }


    if (minPrice !== null) {

      result =
        result.filter(
          product =>
            product.price >= minPrice
        );
    }


    if (maxPrice !== null) {

      result =
        result.filter(
          product =>
            product.price <= maxPrice
        );
    }


    return result;
  }


  toggleProductSelection(
    product: GiftProduct
  ): void {

    const exists =
      this.selectedProducts.some(
        item =>
          item.id === product.id
      );


    if (exists) {

      this.selectedProducts =
        this.selectedProducts.filter(
          item =>
            item.id !== product.id
        );

      return;
    }


    this.selectedProducts = [
      ...this.selectedProducts,
      product
    ];
  }


  setSelectedProducts(
    products: GiftProduct[]
  ): void {

    this.selectedProducts =
      [...products];
  }


  isProductSelected(
    productId: string
  ): boolean {

    return this.selectedProducts.some(
      product =>
        product.id === productId
    );
  }


  getSelectedProducts():
    GiftProduct[] {

    return [
      ...this.selectedProducts
    ];
  }


  getSelectedProductsCount():
    number {

    return this.selectedProducts.length;
  }


  getSelectedProductsTotal():
    number {

    return this.selectedProducts.reduce(
      (
        total,
        product
      ) =>
        total + product.price,
      0
    );
  }


  clearSelectedProducts():
    void {

    this.selectedProducts = [];
  }


  selectBox(
    box: GiftBoxOption
  ): void {

    this.selectedBox =
      box;
  }


  getSelectedBox():
    GiftBoxOption | null {

    return this.selectedBox;
  }


  isBoxSelected(
    boxId: string
  ): boolean {

    return (
      this.selectedBox?.id ===
      boxId
    );
  }


  clearSelectedBox():
    void {

    this.selectedBox =
      null;
  }


  clearGiftSelection():
    void {

    this.clearSelectedProducts();

    this.clearSelectedBox();
  }

}