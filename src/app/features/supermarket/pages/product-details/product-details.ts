import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  RouterModule
} from '@angular/router';

import {
  SupermarketService
} from '../../services/supermarket';

import {
  SupermarketCartService
} from '../../services/supermarket-cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent implements OnInit {

  private route =
    inject(ActivatedRoute);

  private supermarketService =
    inject(SupermarketService);

  private cartService =
    inject(SupermarketCartService);

  private cdr =
    inject(ChangeDetectorRef);

  product: any = null;

  quantity = 1;

  addedSuccess = false;

  ngOnInit(): void {

    const id =
      this.route.snapshot
        .paramMap
        .get('id');

    if (!id) {
      return;
    }

    this.supermarketService
      .getProductById(id)
      .subscribe({

        next: data => {

          this.product = data;

          this.cdr.detectChanges();
        },

        error: err => {

          console.error(
            'Error loading product:',
            err
          );
        }

      });
  }

  increaseQuantity(): void {

    this.quantity++;
  }

  decreaseQuantity(): void {

    if (this.quantity > 1) {

      this.quantity--;
    }
  }

  addToCart(): void {

    if (!this.product) {
      return;
    }

    this.cartService.addToCart(
      this.product,
      this.quantity
    );

    this.addedSuccess = true;

    setTimeout(
      () => {

        this.addedSuccess = false;

        this.cdr.detectChanges();

      },
      2000
    );
  }
}