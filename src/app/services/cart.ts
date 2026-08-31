import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  totalPrice$ = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.price * item.quantity), 0))
  );

  totalCount$ = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  addToCart(product: any, quantity: number = 1): void {
    const currentItems = [...this.itemsSubject.value];
    const index = currentItems.findIndex(i => i.id === product.id);

    if (index > -1) {
      currentItems[index].quantity += quantity;
    } else {
      currentItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    this.itemsSubject.next(currentItems);
  }

  increaseQuantity(productId: number): void {
    const currentItems = [...this.itemsSubject.value];
    const item = currentItems.find(i => i.id === productId);
    if (item) {
      item.quantity++;
      this.itemsSubject.next(currentItems);
    }
  }

  decreaseQuantity(productId: number): void {
    let currentItems = [...this.itemsSubject.value];
    const item = currentItems.find(i => i.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        currentItems = currentItems.filter(i => i.id !== productId);
      }
      this.itemsSubject.next(currentItems);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.itemsSubject.value.filter(i => i.id !== productId);
    this.itemsSubject.next(currentItems);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }
}