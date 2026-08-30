import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

import {
  Subscription
} from 'rxjs';

import {
  CartService
} from '../../services/cart.service';

import {
  AuthService
} from '../../auth/services/auth.service';

import {
  User
} from '../../auth/models/user.model';


@Component({
  selector: 'app-header',

  imports: [
    RouterLink
  ],

  templateUrl: './header.html',

  styleUrl: './header.css'
})
export class Header
  implements OnInit, OnDestroy {

  cartCount = 0;

  currentUser: User | null = null;


  private cartSubscription:
    Subscription | null = null;

  private authSubscription:
    Subscription | null = null;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.cartSubscription =
      this.cartService
        .items$
        .subscribe(
          items => {

            this.cartCount =
              items.reduce(
                (
                  total,
                  item
                ) =>
                  total + item.quantity,
                0
              );

            this.cdr.detectChanges();
          }
        );


    this.authSubscription =
      this.authService
        .currentUser$
        .subscribe(
          user => {

            this.currentUser =
              user;

            this.cdr.detectChanges();
          }
        );
  }


  ngOnDestroy(): void {

    this.cartSubscription
      ?.unsubscribe();

    this.authSubscription
      ?.unsubscribe();
  }


  logout(): void {

    this.authService
      .logout();


    this.router.navigate(
      ['/login']
    );
  }

}
