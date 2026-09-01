import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  SupermarketCartService
} from '../../services/supermarket-cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {

  @Input()
  product: any;

  private cartService =
    inject(SupermarketCartService);

  onAddToCart(event: Event): void {

    event.stopPropagation();

    if (!this.product) {
      return;
    }

    this.cartService.addToCart(
      this.product,
      1
    );
  }
}