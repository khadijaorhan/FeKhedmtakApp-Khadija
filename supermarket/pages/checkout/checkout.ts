import { Component, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items$ = new BehaviorSubject<any[]>([]);
  totalPrice$ = new BehaviorSubject<number>(0);
  totalCount$ = new BehaviorSubject<number>(0);

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
  styleUrl: './checkout.css'
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