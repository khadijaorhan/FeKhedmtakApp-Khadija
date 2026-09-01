import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from './supermarket';


export interface SupermarketCartItem extends Product {
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class SupermarketCartService {

  private readonly itemsSubject =
    new BehaviorSubject<SupermarketCartItem[]>([]);

  readonly items$ =
    this.itemsSubject.asObservable();


  private readonly totalPriceSubject =
    new BehaviorSubject<number>(0);

  readonly totalPrice$ =
    this.totalPriceSubject.asObservable();


  private readonly totalCountSubject =
    new BehaviorSubject<number>(0);

  readonly totalCount$ =
    this.totalCountSubject.asObservable();


  getItems(): SupermarketCartItem[] {
    return [
      ...this.itemsSubject.value
    ];
  }


  addToCart(
    product: Product,
    quantity: number = 1
  ): void {

    const items =
      [...this.itemsSubject.value];

    const index =
      items.findIndex(
        item =>
          item.id === product.id
      );


    if (index !== -1) {

      items[index] = {
        ...items[index],
        quantity:
          items[index].quantity +
          quantity
      };

    } else {

      items.push({
        ...product,
        quantity
      });
    }


    this.updateState(items);
  }


  increaseQuantity(
    productId: string
  ): void {

    const items =
      this.itemsSubject.value.map(
        item =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
      );


    this.updateState(items);
  }


  decreaseQuantity(
    productId: string
  ): void {

    let items =
      this.itemsSubject.value.map(
        item =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1
              }
            : item
      );


    items =
      items.filter(
        item =>
          item.quantity > 0
      );


    this.updateState(items);
  }


  removeItem(
    productId: string
  ): void {

    const items =
      this.itemsSubject.value.filter(
        item =>
          item.id !== productId
      );


    this.updateState(items);
  }


  getSubtotal(): number {

    return this.itemsSubject.value.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );
  }


  getItemsCount(): number {

    return this.itemsSubject.value.reduce(
      (total, item) =>
        total +
        item.quantity,
      0
    );
  }


  clearCart(): void {

    this.updateState([]);
  }


  private updateState(
    items: SupermarketCartItem[]
  ): void {

    this.itemsSubject.next(items);


    this.totalPriceSubject.next(
      items.reduce(
        (total, item) =>
          total +
          item.price *
          item.quantity,
        0
      )
    );


    this.totalCountSubject.next(
      items.reduce(
        (total, item) =>
          total +
          item.quantity,
        0
      )
    );
  }

}