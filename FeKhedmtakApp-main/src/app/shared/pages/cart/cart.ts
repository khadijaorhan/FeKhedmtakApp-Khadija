import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  Subscription
} from 'rxjs';

import {
  CartItem
} from '../../models/cart-item.model';

import {
  CartService
} from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart
  implements OnInit, OnDestroy {

  items: CartItem[] = [];

  private subscription:
    Subscription | null = null;


  constructor(
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.subscription =
      this.cartService
        .items$
        .subscribe(
          items => {

            this.items = items;

            this.cdr.detectChanges();
          }
        );
  }


  ngOnDestroy(): void {

    this.subscription
      ?.unsubscribe();
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


  editItem(
    item: CartItem
  ): void {

    if (
      item.type !== 'custom-gift-box' ||
      item.source !== 'gifts'
    ) {
      return;
    }


    this.router.navigate(
      ['/gifts/preview'],
      {
        state: {
          editCartItem: item
        }
      }
    );
  }


  clearCart(): void {

    this.cartService
      .clearCart();
  }


  get subtotal(): number {

    return this.cartService
      .getSubtotal();
  }


  get itemsCount(): number {

    return this.cartService
      .getItemsCount();
  }


  continueShopping(): void {

    this.router.navigate(
      ['/']
    );
  }


  checkout(): void {

    console.log(
      'Cart ready for Order:',
      {
        items:
          this.cartService.getItems(),

        total:
          this.cartService.getSubtotal()
      }
    );
  }


  isGiftBox(
    item: CartItem
  ): boolean {

    return (
      item.type ===
      'custom-gift-box'
    );
  }


  getSourceName(
    item: CartItem
  ): string {

    switch (item.source) {

      case 'supermarket':
        return 'السوبر ماركت';

      case 'pharmacy':
        return 'الصيدلية';

      case 'gifts':
        return 'الهدايا';

      default:
        return '';
    }
  }


  getBoxName(
    item: CartItem
  ): string {

    return (
      item.details?.box?.name ??
      ''
    );
  }


  getProductsCount(
    item: CartItem
  ): number {

    return (
      item.details?.products?.length ??
      0
    );
  }


  getWrappingName(
    item: CartItem
  ): string {

    return (
      item.details?.wrapping?.name ??
      'بدون تغليف إضافي'
    );
  }


  getCardName(
    item: CartItem
  ): string {

    return (
      item.details?.greetingCard?.name ??
      'بدون بطاقة'
    );
  }


  getPersonalMessage(
    item: CartItem
  ): string {

    return (
      item.details?.personalMessage ??
      ''
    );
  }


  getDeliveryDate(
    item: CartItem
  ): string {

    return (
      item.details?.deliveryDate ??
      ''
    );
  }

}