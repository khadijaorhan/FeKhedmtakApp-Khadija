import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  AsyncPipe,
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  Observable
} from 'rxjs';

import {
  SupermarketCartService,
  SupermarketCartItem
} from '../../services/supermarket-cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe
  ],

  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css'
})
export class CartDrawerComponent {

  @Input()
  isOpen = false;

  @Output()
  closeDrawer =
    new EventEmitter<void>();

  cartService =
    inject(SupermarketCartService);

  private router =
    inject(Router);

  cartItems$:
    Observable<SupermarketCartItem[]> =
      this.cartService.items$;

  totalPrice$:
    Observable<number> =
      this.cartService.totalPrice$;

  totalCount$:
    Observable<number> =
      this.cartService.totalCount$;

  onClose(): void {
    this.closeDrawer.emit();
  }

  close(): void {
    this.closeDrawer.emit();
  }

  increaseQuantity(
    item: SupermarketCartItem
  ): void {

    this.cartService
      .increaseQuantity(
        String(item.id)
      );
  }

  decreaseQuantity(
    item: SupermarketCartItem
  ): void {

    this.cartService
      .decreaseQuantity(
        String(item.id)
      );
  }

  removeItem(
    item: SupermarketCartItem
  ): void {

    this.cartService
      .removeItem(
        String(item.id)
      );
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  goToCheckout(): void {

    this.closeDrawer.emit();

    this.router.navigate([
      '/supermarket/checkout'
    ]);
  }
}