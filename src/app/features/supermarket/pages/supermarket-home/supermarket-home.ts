import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { CartDrawerComponent } from '../../components/cart-drawer/cart-drawer';
import { SupermarketService } from '../../services/supermarket';

import { Product } from '../../services/supermarket';

@Component({
  selector: 'app-supermarket-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, CartDrawerComponent],
  templateUrl: './supermarket-home.html',
  styleUrl: './supermarket-home.css'
})
export class SupermarketHomeComponent implements OnInit {
  offers: Product[] = [];
  featuredProducts: Product[] = [];
  categories: string[] = [];
  
  // حالة فتح وإغلاق السلة
  isCartOpen: boolean = false;

  constructor(
    private supermarketService: SupermarketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categories = this.supermarketService.categories;

    this.supermarketService.getProducts().subscribe({
      next: (products) => {
        // أول 4 منتجات لقسم العروض
        this.offers = products.slice(0, 4);

        // 4 منتجات مختلفة تماماً لقسم الأكثر طلباً
        this.featuredProducts = products.slice(4, 8);

        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error loading products:', err)
    });
  }

  // دوال التحكم في السلة
  openCart(): void {
    this.isCartOpen = true;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }
}