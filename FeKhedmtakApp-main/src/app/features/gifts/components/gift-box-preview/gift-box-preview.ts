import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  forkJoin
} from 'rxjs';

import {
  GiftBoxOption,
  GreetingCardOption,
  WrappingOption
} from '../../models/gift-box.model';

import {
  GiftCartItem
} from '../../models/gift-cart-item.model';

import {
  GiftCategory,
  GiftProduct
} from '../../models/gift.model';

import {
  GiftIntegrationService
} from '../../services/gift-integration.service';

import {
  GiftsService
} from '../../services/gifts.service';

import {
  CartService
} from '../../../../shared/services/cart.service';

import {
  CartItem
} from '../../../../shared/models/cart-item.model';

import {
  DeliveryDatePicker
} from '../delivery-date-picker/delivery-date-picker';

import {
  GiftMessage
} from '../gift-message/gift-message';

import {
  GiftSummary
} from '../gift-summary/gift-summary';

import {
  GreetingCardSelector
} from '../greeting-card-selector/greeting-card-selector';

import {
  WrappingSelector
} from '../wrapping-selector/wrapping-selector';


interface ProductGroup {
  category: GiftCategory;
  name: string;
  icon: string;
  products: GiftProduct[];
}


@Component({
  selector: 'app-gift-box-preview',

  imports: [
    WrappingSelector,
    GreetingCardSelector,
    GiftMessage,
    DeliveryDatePicker,
    GiftSummary
  ],

  templateUrl: './gift-box-preview.html',

  styleUrl: './gift-box-preview.css'
})
export class GiftBoxPreview
  implements OnInit {

  selectedBox:
    GiftBoxOption | null = null;

  selectedProducts:
    GiftProduct[] = [];

  productGroups:
    ProductGroup[] = [];


  selectedWrapping:
    WrappingOption | null = null;

  selectedCard:
    GreetingCardOption | null = null;

  personalMessage = '';

  deliveryDate:
    string | null = null;


  confirmationMessage = '';

  preparedCartItem:
    GiftCartItem | null = null;

  addedToCart = false;


  editingCartItem:
    CartItem | null = null;


  wrappingOptions:
    WrappingOption[] = [];

  cardOptions:
    GreetingCardOption[] = [];

  loadingExtras = true;


  private readonly categoryInfo:
    Record<
      GiftCategory,
      {
        name: string;
        icon: string;
      }
    > = {

      flowers: {
        name: 'الورد',
        icon: '🌹'
      },

      chocolates: {
        name: 'الشوكولاتة',
        icon: '🍫'
      },

      perfumes: {
        name: 'العطور',
        icon: '🌸'
      },

      candles: {
        name: 'الشموع',
        icon: '🕯️'
      },

      accessories: {
        name: 'الإكسسوارات',
        icon: '🎀'
      },

      clothes: {
        name: 'الملابس',
        icon: '👕'
      },

      toys: {
        name: 'الألعاب',
        icon: '🧸'
      }
    };


  constructor(
    private giftsService:
      GiftsService,

    private giftIntegrationService:
      GiftIntegrationService,

    private cartService:
      CartService,

    private router:
      Router,

    private cdr:
      ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.restoreEditData();


    this.selectedBox =
      this.giftsService
        .getSelectedBox();


    this.selectedProducts =
      this.giftsService
        .getSelectedProducts();


    if (
      !this.selectedBox ||
      this.selectedProducts.length === 0
    ) {

      this.router.navigate(
        ['/gifts/catalog']
      );

      return;
    }


    this.createProductGroups();

    this.loadExtras();
  }


  private restoreEditData(): void {

    const item =
      history.state?.editCartItem as
        CartItem | undefined;


    if (
      !item ||
      item.source !== 'gifts' ||
      item.type !== 'custom-gift-box' ||
      !item.details?.box ||
      !item.details?.products
    ) {
      return;
    }


    this.editingCartItem =
      item;


    this.giftsService
      .setSelectedProducts(
        item.details.products as
          GiftProduct[]
      );


    this.giftsService
      .selectBox(
        item.details.box as
          GiftBoxOption
      );


    this.selectedWrapping =
      (
        item.details.wrapping ??
        null
      ) as WrappingOption | null;


    this.selectedCard =
      (
        item.details.greetingCard ??
        null
      ) as GreetingCardOption | null;


    this.personalMessage =
      item.details.personalMessage ??
      '';


    this.deliveryDate =
      item.details.deliveryDate ??
      null;
  }


  private loadExtras(): void {

    this.loadingExtras = true;


    forkJoin({

      wrappings:
        this.giftsService
          .getWrappings(),

      cards:
        this.giftsService
          .getGreetingCards()

    }).subscribe({

      next: result => {

        this.wrappingOptions =
          result.wrappings;

        this.cardOptions =
          result.cards;

        this.loadingExtras =
          false;

        this.cdr.detectChanges();
      },


      error: error => {

        console.error(
          'خطأ أثناء تحميل إضافات الهدية:',
          error
        );

        this.wrappingOptions = [];

        this.cardOptions = [];

        this.loadingExtras = false;

        this.cdr.detectChanges();
      }

    });
  }


  private createProductGroups(): void {

    const categories = [
      ...new Set(
        this.selectedProducts.map(
          product =>
            product.category
        )
      )
    ];


    this.productGroups =
      categories.map(
        category => {

          const info =
            this.categoryInfo[
              category
            ];


          return {
            category,

            name:
              info.name,

            icon:
              info.icon,

            products:
              this.selectedProducts
                .filter(
                  product =>
                    product.category ===
                    category
                )
          };

        }
      );
  }


  onWrappingSelected(
    wrapping:
      WrappingOption | null
  ): void {

    this.selectedWrapping =
      wrapping;

    this.resetConfirmation();
  }


  onCardSelected(
    card:
      GreetingCardOption | null
  ): void {

    this.selectedCard =
      card;

    this.resetConfirmation();
  }


  onMessageChange(
    message: string
  ): void {

    this.personalMessage =
      message;

    this.resetConfirmation();
  }


  onDeliveryDateChange(
    date: string | null
  ): void {

    this.deliveryDate =
      date;

    this.resetConfirmation();
  }


  get productsTotal():
    number {

    return this.selectedProducts
      .reduce(
        (
          total,
          product
        ) =>
          total + product.price,
        0
      );
  }


  get boxPrice():
    number {

    return (
      this.selectedBox?.price ??
      0
    );
  }


  get wrappingPrice():
    number {

    return (
      this.selectedWrapping?.price ??
      0
    );
  }


  get cardPrice():
    number {

    return (
      this.selectedCard?.price ??
      0
    );
  }


  get finalTotal():
    number {

    return (
      this.productsTotal +
      this.boxPrice +
      this.wrappingPrice +
      this.cardPrice
    );
  }


  get isEditing():
    boolean {

    return (
      this.editingCartItem !==
      null
    );
  }


  confirmGiftBox(): void {

    if (this.addedToCart) {
      return;
    }


    const cartItem =
      this.giftIntegrationService
        .buildCartItem(
          this.selectedWrapping,
          this.selectedCard,
          this.personalMessage,
          this.deliveryDate
        );


    if (!cartItem) {

      this.confirmationMessage =
        'تعذر تجهيز صندوق الهدية.';

      return;
    }


    if (this.editingCartItem) {

      const updatedItem:
        GiftCartItem = {

        ...cartItem,

        id:
          this.editingCartItem.id,

        quantity:
          this.editingCartItem.quantity
      };


      this.cartService
        .updateItem(
          this.editingCartItem.id,
          this.editingCartItem.source,
          updatedItem
        );


      this.preparedCartItem =
        updatedItem;


      this.confirmationMessage =
        'تم تحديث صندوق الهدية في سلة التسوق بنجاح.';

    } else {

      this.cartService
        .addItem(
          cartItem
        );


      this.preparedCartItem =
        cartItem;


      this.confirmationMessage =
        'تم إضافة صندوق الهدية إلى سلة التسوق بنجاح.';
    }


    this.giftsService
      .clearGiftSelection();


    this.addedToCart =
      true;


    this.cdr.detectChanges();
  }


  goToCart(): void {

    this.router.navigate(
      ['/cart']
    );
  }


  goBack(): void {

    if (this.isEditing) {

      this.router.navigate(
        ['/cart']
      );

      return;
    }


    if (this.addedToCart) {

      this.router.navigate(
        ['/gifts']
      );

      return;
    }


    this.router.navigate(
      ['/gifts/customize']
    );
  }


  continueShopping(): void {

    this.router.navigate(
      ['/gifts/catalog']
    );
  }


  private resetConfirmation(): void {

    if (this.addedToCart) {
      return;
    }


    this.confirmationMessage = '';

    this.preparedCartItem = null;
  }

}