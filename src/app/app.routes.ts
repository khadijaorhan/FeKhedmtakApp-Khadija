import {
  Routes
} from '@angular/router';

import {
  MainLayout
} from './layouts/main-layout/main-layout';

import {
  Home
} from './shared/pages/home/home';

import {
  Cart
} from './shared/pages/cart/cart';

import {
  Login
} from './shared/auth/pages/login/login';

import {
  Register
} from './shared/auth/pages/register/register';

import {
  ForgotPassword
} from './shared/auth/pages/forgot-password/forgot-password';

import {
  OrdersComponent
} from './features/orders/orders.component';


export const routes: Routes = [

  {
    path: '',

    component: MainLayout,

    children: [

      {
        path: '',
        component: Home
      },

      {
        path: 'supermarket',

        loadChildren: () =>
          import(
            './features/supermarket/supermarket.routes'
          ).then(
            routes =>
              routes.SUPERMARKET_ROUTES
          )
      },

      {
        path: 'gifts',

        loadChildren: () =>
          import(
            './features/gifts/gifts.routes'
          ).then(
            routes =>
              routes.GIFTS_ROUTES
          )
      },

      {
        path: 'cart',
        component: Cart
      },

      {
        path: 'orders',
        component: OrdersComponent
      },

      {
        path: 'login',
        component: Login
      },

      {
        path: 'register',
        component: Register
      },

      {
        path: 'forgot-password',
        component: ForgotPassword
      }

    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];