import {
  Component,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

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

import {
  CartService
} from '../../../../shared/services/cart.service';

import {
  CartItem
} from '../../../../shared/models/cart-item.model';

@Component({
  selector: 'app-checkout',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {

  supermarketCart =
    inject(SupermarketCartService);

  sharedCart =
    inject(CartService);

  router =
    inject(Router);

  cartItems$:
    Observable<SupermarketCartItem[]> =
      this.supermarketCart.items$;

  totalPrice$:
    Observable<number> =
      this.supermarketCart.totalPrice$;

  totalCount$:
    Observable<number> =
      this.supermarketCart.totalCount$;

  shippingFee = 15;

  isSubmitting = false;

  orderCompleted = false;

  customer: any = {

    fullName: '',

    name: '',

    phone: '',

    address: '',

    city: '',

    notes: '',

    paymentMethod: 'cash'
  };

  formData: any =
    this.customer;

  onSubmit(): void {

    const supermarketItems =
      this.supermarketCart.getItems();

    if (
      supermarketItems.length === 0
    ) {

      alert(
        'سلة السوبر ماركت فارغة.'
      );

      return;
    }

    this.isSubmitting = true;

    const subtotal =
      this.supermarketCart
        .getSubtotal();

    const finalTotal =
      subtotal +
      this.shippingFee;

    const supermarketOrder:
      CartItem = {

      id:
        `supermarket-order-${Date.now()}`,

      source:
        'supermarket',

      type:
        'normal-product',

      name:
        `طلب سوبر ماركت - ${supermarketItems.length} منتجات`,

      price:
        finalTotal,

      quantity:
        1,

      image:
        supermarketItems[0]?.image,

      details: {
        products:
          supermarketItems.map(
            item => ({
              id:
                String(item.id),

              name:
                item.name,

              price:
                item.price,

              image:
                item.image,

              category:
                item.category
            })
          ),

        totalPrice:
          finalTotal
      }
    };

    setTimeout(
      () => {

        /*
         * إضافة الطلب النهائي
         * إلى Shared Basket.
         */
        this.sharedCart.addItem(
          supermarketOrder
        );

        /*
         * تفريغ سلة السوبرماركت
         * بعد نجاح التأكيد فقط.
         */
        this.supermarketCart
          .clearCart();

        this.isSubmitting =
          false;

        this.orderCompleted =
          true;

        /*
         * نروح للباسكت المشتركة
         * علشان المستخدم يشوف الطلب.
         */
        this.router.navigate([
          '/cart'
        ]);

      },
      1200
    );
  }
}