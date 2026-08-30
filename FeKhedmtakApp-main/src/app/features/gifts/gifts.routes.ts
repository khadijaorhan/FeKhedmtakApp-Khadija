import {
  Routes
} from '@angular/router';

import {
  GiftsHome
} from './pages/gifts-home/gifts-home';

import {
  GiftRecommendation
} from './pages/gift-recommendation/gift-recommendation';

import {
  Categories
} from './pages/categories/categories';

import {
  CategoryProducts
} from './pages/category-products/category-products';

import {
  GiftCatalog
} from './pages/gift-catalog/gift-catalog';

import {
  GiftDetails
} from './pages/gift-details/gift-details';

import {
  CustomizeGift
} from './pages/customize-gift/customize-gift';

import {
  Offers
} from './pages/offers/offers';

import {
  GiftBoxPreview
} from './components/gift-box-preview/gift-box-preview';


export const GIFTS_ROUTES: Routes = [

  {
    path: '',
    component: GiftsHome
  },

  {
    path: 'recommend',
    component: GiftRecommendation
  },

  {
    path: 'catalog',
    component: GiftCatalog
  },

  {
    path: 'categories',
    component: Categories
  },

  {
    path: 'category/:id',
    component: CategoryProducts
  },

  {
    path: 'product/:id',
    component: GiftDetails
  },

  {
    path: 'customize',
    component: CustomizeGift
  },

  {
    path: 'preview',
    component: GiftBoxPreview
  },

  {
    path: 'offers',
    component: Offers
  },

  {
    path: '**',
    redirectTo: ''
  }

];