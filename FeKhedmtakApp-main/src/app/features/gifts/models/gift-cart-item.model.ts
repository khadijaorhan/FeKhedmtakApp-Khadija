import {
  GiftBoxOption,
  GreetingCardOption,
  WrappingOption
} from './gift-box.model';

import {
  GiftProduct
} from './gift.model';


export interface GiftCartItemDetails {
  box: GiftBoxOption;

  products: GiftProduct[];

  wrapping: WrappingOption | null;

  greetingCard: GreetingCardOption | null;

  personalMessage: string;

  deliveryDate: string | null;

  totalPrice: number;
}


export interface GiftCartItem {
  id: string;

  source: 'gifts';

  type: 'custom-gift-box';

  name: string;

  price: number;

  quantity: number;

  image?: string;

  details: GiftCartItemDetails;
}