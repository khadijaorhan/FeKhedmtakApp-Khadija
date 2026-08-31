import {
  Injectable
} from '@angular/core';

import {
  GreetingCardOption,
  WrappingOption
} from '../models/gift-box.model';

import {
  GiftCartItem
} from '../models/gift-cart-item.model';

import {
  GiftsService
} from './gifts.service';


@Injectable({
  providedIn: 'root'
})
export class GiftIntegrationService {

  constructor(
    private giftsService:
      GiftsService
  ) {}


  buildCartItem(
    wrapping:
      WrappingOption | null,

    greetingCard:
      GreetingCardOption | null,

    personalMessage:
      string,

    deliveryDate:
      string | null
  ): GiftCartItem | null {

    const box =
      this.giftsService
        .getSelectedBox();


    const products =
      this.giftsService
        .getSelectedProducts();


    if (
      !box ||
      products.length === 0
    ) {
      return null;
    }


    const productsTotal =
      products.reduce(
        (
          total,
          product
        ) =>
          total +
          product.price,
        0
      );


    const wrappingPrice =
      wrapping?.price ?? 0;


    const cardPrice =
      greetingCard?.price ?? 0;


    const totalPrice =
      productsTotal +
      box.price +
      wrappingPrice +
      cardPrice;


    return {

      id:
        `gift-box-${Date.now()}`,

      source:
        'gifts',

      type:
        'custom-gift-box',

      name:
        'صندوق هدايا مخصص',

      price:
        totalPrice,

      quantity:
        1,

      image:
        box.image,

      details: {

        box,

        products,

        wrapping,

        greetingCard,

        personalMessage:
          personalMessage.trim(),

        deliveryDate,

        totalPrice
      }

    };
  }

}