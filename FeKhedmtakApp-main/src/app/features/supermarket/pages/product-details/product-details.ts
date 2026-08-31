
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupermarketService } from '../../services/supermarket';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private supermarketService = inject(SupermarketService);
  private cdr = inject(ChangeDetectorRef);

  product: any = null;
  quantity: number = 1;
  addedSuccess: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supermarketService.getProductById(id).subscribe({
        next: (data: any) => {
          this.product = data;
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error(err)
      });
    }
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
    if (this.product) {
      this.addedSuccess = true;
      setTimeout(() => {
        this.addedSuccess = false;
        this.cdr.detectChanges();
      }, 2000);
    }
  }
}