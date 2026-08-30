import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartService } from '../../pages/checkout/checkout';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input() product: any;

  // حقن خدمة السلة
  private cartService = inject(CartService);

  // دالة الإضافة للسلة عند الضغط على الزر
  onAddToCart(event: Event): void {
    event.stopPropagation(); // لمنع فتح تفاصيل المنتج عند الضغط على الزر
    if (this.product) {
      // this.cartService.addToCart(this.product, 1);
      (this.cartService as any)?.addToCart?.(this.product as any, 1);
    }
  }
}
