import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject
} from '@angular/core';

import {
  CommonModule,
  AsyncPipe
} from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  Observable,
  map
} from 'rxjs';

import {
  CartService
} from '../../../../shared/services/cart.service';

import {
  CartItem
} from '../../../../shared/models/cart-item.model';


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


  private cartService =
    inject(CartService);

  private router =
    inject(Router);


  cartItems$:
    Observable<CartItem[]> =
      this.cartService.items$
        .pipe(
          map(
            items =>
              items.filter(
                item =>
                  item.source ===
                  'supermarket'
              )
          )
        );


  totalPrice$:
    Observable<number> =
      this.cartItems$
        .pipe(
          map(
            items =>
              items.reduce(
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
              )
          )
        );


  totalCount$:
    Observable<number> =
      this.cartItems$
        .pipe(
          map(
            items =>
              items.reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  item.quantity,
                0
              )
          )
        );


  onClose():
    void {

    this.closeDrawer
      .emit();
  }


  close():
    void {

    this.closeDrawer
      .emit();
  }


  increaseQuantity(
    item: CartItem
  ): void {

    this.cartService
      .increaseQuantity(
        item.id,
        item.source
      );
  }


  decreaseQuantity(
    item: CartItem
  ): void {

    this.cartService
      .decreaseQuantity(
        item.id,
        item.source
      );
  }


  removeItem(
    item: CartItem
  ): void {

    this.cartService
      .removeItem(
        item.id,
        item.source
      );
  }


  clearCart():
    void {

    const supermarketItems =
      this.cartService
        .getItems()
        .filter(
          item =>
            item.source ===
            'supermarket'
        );


    supermarketItems.forEach(
      item => {

        this.cartService
          .removeItem(
            item.id,
            item.source
          );
      }
    );
  }


  goToCheckout():
    void {

    this.closeDrawer
      .emit();

    this.router.navigate(
      ['/supermarket/checkout']
    );
  }

}