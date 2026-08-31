import { Routes } from '@angular/router';

import {
  SupermarketHomeComponent
} from './pages/supermarket-home/supermarket-home';

import {
  ProductsComponent
} from './pages/products/products';

import {
  ProductDetailsComponent
} from './pages/product-details/product-details';

import {
  Categories
} from './pages/categories/categories';

import {
  CheckoutComponent
} from './pages/checkout/checkout';


export const SUPERMARKET_ROUTES: Routes = [

  {
    path: '',
    component: SupermarketHomeComponent
  },

  {
    path: 'products',
    component: ProductsComponent
  },

  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },

  {
    path: 'categories',
    component: Categories
  },

  {
    path: 'checkout',
    component: CheckoutComponent
  }

];