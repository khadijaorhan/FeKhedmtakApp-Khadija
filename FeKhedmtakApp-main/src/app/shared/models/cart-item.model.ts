export type CartSource =
  | 'supermarket'
  | 'pharmacy'
  | 'gifts';


export type CartItemType =
  | 'normal-product'
  | 'custom-gift-box';


export interface GiftCartDetails {
  box?: {
    id?: string;
    name?: string;
    price?: number;
    image?: string;
    size?: string;
  };

  products?: {
    id?: string;
    name?: string;
    price?: number;
    image?: string;
    category?: string;
  }[];

  wrapping?: {
    id?: string;
    name?: string;
    price?: number;
  } | null;

  greetingCard?: {
    id?: string;
    name?: string;
    price?: number;
  } | null;

  personalMessage?: string;

  deliveryDate?: string | null;

  totalPrice?: number;
}


export interface CartItem {
  id: string;

  source: CartSource;

  type: CartItemType;

  name: string;

  price: number;

  quantity: number;

  image?: string;

  details?: GiftCartDetails;
}