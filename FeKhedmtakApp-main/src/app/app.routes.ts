
import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './shared/pages/home/home';
import { Cart } from './shared/pages/cart/cart';
import { Login } from './shared/auth/pages/login/login';
import { Register } from './shared/auth/pages/register/register';
import { ForgotPassword } from './shared/auth/pages/forgot-password/forgot-password';
import { SupermarketHomeComponent } from './features/supermarket/pages/supermarket-home/supermarket-home';

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
        path: 'gifts',
        loadChildren: () =>
          import('./features/gifts/gifts.routes').then(
            routes => routes.GIFTS_ROUTES
          )
      },
      {
        path: 'supermarket',
        component: SupermarketHomeComponent
      },
      {
        path: 'supermarket/products',
        loadComponent: () =>
          import('./features/supermarket/pages/products/products').then(
            (m: any) => m.ProductsComponent || m.Products
          )
      },
      {
        path: 'supermarket/categories',
        loadComponent: () =>
          import('./features/supermarket/pages/categories/categories').then(
            (m: any) => m.CategoriesComponent || m.Categories
          )
      },
      {
        path: 'supermarket/product/:id',
        loadComponent: () =>
          import('./features/supermarket/pages/product-details/product-details').then(
            (m: any) => m.ProductDetailsComponent || m.ProductDetails
          )
      },
      {
        path: 'supermarket/checkout',
        loadComponent: () =>
          import('./features/supermarket/pages/checkout/checkout').then(
            (m: any) => m.CheckoutComponent || m.Checkout
          )
      },
      {
        path: 'cart',
        component: Cart
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