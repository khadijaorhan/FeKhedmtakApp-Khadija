export type GiftRecipient =
  | 'male'
  | 'female'
  | 'boy'
  | 'girl';


export type GiftOccasion =
  | 'birthday'
  | 'anniversary'
  | 'graduation'
  | 'congratulations'
  | 'thanks'
  | 'love'
  | 'apology'
  | 'none';


export type GiftCategory =
  | 'flowers'
  | 'chocolates'
  | 'perfumes'
  | 'candles'
  | 'accessories'
  | 'clothes'
  | 'toys';


export interface GiftProduct {
  id: string;

  name: string;

  description: string;

  price: number;

  image: string;

  category: GiftCategory;

  rating?: number;

  suitableFor: GiftRecipient[];

  occasions: GiftOccasion[];
}