export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}