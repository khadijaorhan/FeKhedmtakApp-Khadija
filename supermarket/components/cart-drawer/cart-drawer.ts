import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../pages/checkout/checkout';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css'
})
export class CartDrawerComponent {
  @Input() isOpen: boolean = false;
  @Output() closeDrawer = new EventEmitter<void>();

  cartService = inject(CartService);
  private router = inject(Router);

  cartItems$: Observable<any[]> = this.cartService.items$;
  totalPrice$: Observable<number> = this.cartService.totalPrice$;
  totalCount$: Observable<number> = this.cartService.totalCount$;

  onClose(): void {
    this.closeDrawer.emit();
  }

  close(): void {
    this.closeDrawer.emit();
  }

  increaseQuantity(productId?: any): void {
    (this.cartService as any)?.increaseQuantity?.(productId);
  }

  decreaseQuantity(productId?: any): void {
    (this.cartService as any)?.decreaseQuantity?.(productId);
  }

  updateQuantity(item: any, change?: number): void {
    (this.cartService as any)?.updateQuantity?.(item, change);
  }

  removeItem(itemOrId?: any): void {
    (this.cartService as any)?.removeItem?.(itemOrId);
  }

  clearCart(): void {
    (this.cartService as any)?.clearCart?.();
  }

  goToCheckout(): void {
    this.closeDrawer.emit();
    this.router.navigate(['/supermarket/checkout']);
  }
}