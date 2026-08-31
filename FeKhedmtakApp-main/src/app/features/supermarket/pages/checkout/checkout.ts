import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items$ = new BehaviorSubject<CartItem[]>([]);
  totalPrice$ = new BehaviorSubject<number>(0);
  totalCount$ = new BehaviorSubject<number>(0);

  private updateTotals(items: CartItem[]): void {
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const price = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0);
    this.items$.next([...items]);
    this.totalCount$.next(count);
    this.totalPrice$.next(price);
  }

  addToCart(product: any, quantity: number = 1): void {
    if (!product) return;
    const currentItems = [...this.items$.value];
    const existingIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      currentItems[existingIndex].quantity += quantity;
    } else {
      currentItems.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        oldPrice: product.oldPrice,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    this.updateTotals(currentItems);
  }

  increaseQuantity(productId: any): void {
    this.updateQuantity(productId, 1);
  }

  decreaseQuantity(productId: any): void {
    this.updateQuantity(productId, -1);
  }

  updateQuantity(itemOrId: any, change: number = 1): void {
    const id = typeof itemOrId === 'object' ? itemOrId?.id : itemOrId;
    let currentItems = [...this.items$.value];
    const index = currentItems.findIndex(item => item.id === id);

    if (index > -1) {
      const newQty = currentItems[index].quantity + change;
      if (newQty <= 0) {
        currentItems = currentItems.filter(item => item.id !== id);
      } else {
        currentItems[index].quantity = newQty;
      }
      this.updateTotals(currentItems);
    }
  }

  removeItem(itemOrId: any): void {
    const id = typeof itemOrId === 'object' ? itemOrId?.id : itemOrId;
    const currentItems = this.items$.value.filter(item => item.id !== id);
    this.updateTotals(currentItems);
  }

  clearCart(): void {
    this.items$.next([]);
    this.totalPrice$.next(0);
    this.totalCount$.next(0);
  }
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
  cartService = inject(CartService);
  router = inject(Router);

  cartItems$: Observable<any[]> = this.cartService.items$;
  totalPrice$: Observable<number> = this.cartService.totalPrice$;
  totalCount$: Observable<number> = this.cartService.totalCount$;

  shippingFee: number = 15;
  isSubmitting: boolean = false;
  orderCompleted: boolean = false;

  customer: any = {
    fullName: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'cash'
  };

  formData: any = this.customer;

  onSubmit(): void {
    this.isSubmitting = true;
    setTimeout(() => {
      this.cartService.clearCart();
      this.isSubmitting = false;
      this.orderCompleted = true;
    }, 1200);
  }
}