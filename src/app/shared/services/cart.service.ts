import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  CartItem
} from '../models/cart-item.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly storageKey =
    'fekhedmtak-cart';


  private readonly itemsSubject =
    new BehaviorSubject<CartItem[]>(
      this.loadCart()
    );


  readonly items$ =
    this.itemsSubject.asObservable();


  getItems(): CartItem[] {

    return [
      ...this.itemsSubject.value
    ];
  }


  addItem(
    item: CartItem
  ): void {

    const currentItems =
      this.getItems();


    const existingIndex =
      currentItems.findIndex(
        cartItem =>
          cartItem.id === item.id &&
          cartItem.source === item.source &&
          cartItem.type === item.type
      );


    if (
      existingIndex !== -1
    ) {

      const existingItem =
        currentItems[
          existingIndex
        ];


      currentItems[
        existingIndex
      ] = {
        ...existingItem,

        quantity:
          existingItem.quantity +
          item.quantity
      };

    } else {

      currentItems.push({
        ...item
      });
    }


    this.updateCart(
      currentItems
    );
  }


  updateItem(
    itemId: string,
    source: CartItem['source'],
    updatedItem: CartItem
  ): void {

    const currentItems =
      this.getItems();


    const updatedItems =
      currentItems.map(
        item => {

          if (
            item.id === itemId &&
            item.source === source
          ) {

            return {
              ...updatedItem,
              id: itemId,
              source
            };
          }


          return item;
        }
      );


    this.updateCart(
      updatedItems
    );
  }


  removeItem(
    itemId: string,
    source?: CartItem['source']
  ): void {

    const updatedItems =
      this.getItems().filter(
        item => {

          if (source) {

            return !(
              item.id === itemId &&
              item.source === source
            );
          }


          return item.id !== itemId;
        }
      );


    this.updateCart(
      updatedItems
    );
  }


  increaseQuantity(
    itemId: string,
    source?: CartItem['source']
  ): void {

    const updatedItems =
      this.getItems().map(
        item => {

          const matches =
            item.id === itemId &&
            (
              !source ||
              item.source === source
            );


          if (!matches) {
            return item;
          }


          return {
            ...item,

            quantity:
              item.quantity + 1
          };
        }
      );


    this.updateCart(
      updatedItems
    );
  }


  decreaseQuantity(
    itemId: string,
    source?: CartItem['source']
  ): void {

    const updatedItems =
      this.getItems()
        .map(
          item => {

            const matches =
              item.id === itemId &&
              (
                !source ||
                item.source === source
              );


            if (!matches) {
              return item;
            }


            return {
              ...item,

              quantity:
                item.quantity - 1
            };
          }
        )
        .filter(
          item =>
            item.quantity > 0
        );


    this.updateCart(
      updatedItems
    );
  }


  getItemsCount(): number {

    return this.itemsSubject.value
      .reduce(
        (
          total,
          item
        ) =>
          total +
          item.quantity,
        0
      );
  }


  getSubtotal(): number {

    return this.itemsSubject.value
      .reduce(
        (
          total,
          item
        ) =>
          total +
          (
            item.price *
            item.quantity
          ),
        0
      );
  }


  getItemsBySource(
    source: CartItem['source']
  ): CartItem[] {

    return this.itemsSubject.value
      .filter(
        item =>
          item.source === source
      );
  }


  hasItems(): boolean {

    return (
      this.itemsSubject.value
        .length > 0
    );
  }


  clearCart(): void {

    this.updateCart([]);
  }


  private updateCart(
    items: CartItem[]
  ): void {

    this.itemsSubject.next(
      items
    );


    localStorage.setItem(
      this.storageKey,
      JSON.stringify(items)
    );
  }


  private loadCart(): CartItem[] {

    try {

      const savedCart =
        localStorage.getItem(
          this.storageKey
        );


      if (!savedCart) {
        return [];
      }


      const parsed =
        JSON.parse(
          savedCart
        );


      if (
        !Array.isArray(parsed)
      ) {
        return [];
      }


      return parsed as CartItem[];

    } catch {

      return [];
    }
  }

}