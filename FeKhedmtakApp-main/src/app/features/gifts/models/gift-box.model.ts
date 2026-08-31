import { GiftProduct } from './gift.model';


export interface GiftBoxOption {
  id: string;

  name: string;

  price: number;

  image: string;

  size: 'small' | 'medium' | 'large';
}


export interface WrappingOption {
  id: string;

  name: string;

  price: number;

  image?: string;
}


export interface GreetingCardOption {
  id: string;

  name: string;

  price: number;

  image?: string;
}


export interface CustomGiftBox {
  box: GiftBoxOption | null;

  products: GiftProduct[];

  wrapping: WrappingOption | null;

  greetingCard: GreetingCardOption | null;

  personalMessage: string;

  deliveryDate: string | null;

  totalPrice: number;
}