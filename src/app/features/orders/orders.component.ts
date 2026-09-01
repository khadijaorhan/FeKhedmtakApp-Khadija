import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  Subscription
} from 'rxjs';

import {
  CartService
} from '../../shared/services/cart.service';

import {
  CartItem
} from '../../shared/models/cart-item.model';


@Component({
  selector: 'app-orders',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './orders.component.html',

  styleUrls: [
    './orders.component.css'
  ]
})
export class OrdersComponent
  implements OnInit, OnDestroy {

  items: CartItem[] = [];

  private cartSub:
    Subscription | null = null;


  customerData = {
    name: '',
    phone: '',
    country: '',
    address: '',
    paymentMethod: 'cash'
  };


  visaData = {
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };


  constructor(
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    /*
     * ناخد نسخة فورية من الـShared Basket
     * أول ما صفحة الـOrders تفتح.
     */
    this.items =
      this.cartService.getItems();


    /*
     * ونفضل متابعين أي تغيير
     * يحصل في الـShared Basket.
     */
    this.cartSub =
      this.cartService
        .items$
        .subscribe(
          items => {

            this.items = [
              ...items
            ];

            this.cdr.detectChanges();
          }
        );
  }


  ngOnDestroy(): void {

    this.cartSub
      ?.unsubscribe();
  }


  increaseQty(
    index: number
  ): void {

    const item =
      this.items[index];

    if (!item) {
      return;
    }


    this.cartService
      .increaseQuantity(
        item.id,
        item.source
      );
  }


  decreaseQty(
    index: number
  ): void {

    const item =
      this.items[index];

    if (!item) {
      return;
    }


    this.cartService
      .decreaseQuantity(
        item.id,
        item.source
      );
  }


  removeItem(
    index: number
  ): void {

    const item =
      this.items[index];

    if (!item) {
      return;
    }


    this.cartService
      .removeItem(
        item.id,
        item.source
      );
  }


  calculateSubtotal():
    number {

    return this.cartService
      .getSubtotal();
  }


  submitOrder(): void {

    if (
      this.items.length === 0
    ) {

      alert(
        'السلة فارغة!'
      );

      return;
    }


    if (
      !this.customerData.name ||
      !this.customerData.phone ||
      !this.customerData.address
    ) {

      alert(
        'يرجى ملء جميع البيانات المطلوبة للتوصيل.'
      );

      return;
    }


    if (
      this.customerData.paymentMethod ===
      'visa'
    ) {

      if (
        !this.visaData.cardHolder ||
        !this.visaData.cardNumber ||
        !this.visaData.expiryDate ||
        !this.visaData.cvv
      ) {

        alert(
          'يرجى ملء كافة بيانات الفيزا كاملة.'
        );

        return;
      }


      alert(
        'تم تأكيد الدفع وإرسال طلبك بنجاح!'
      );

    } else {

      alert(
        'تم إرسال طلبك بنجاح! الدفع عند الاستلام.'
      );
    }


    /*
     * هنا لاحقًا هنرسل:
     *
     * this.items
     * this.customerData
     * this.calculateSubtotal()
     *
     * إلى جزء الـDelivery.
     */


    /*
     * تتفضى الـShared Basket
     * بعد نجاح الطلب فقط.
     */
    this.cartService
      .clearCart();


    this.router
      .navigate(['/']);
  }

}