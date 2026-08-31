import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { SupermarketService } from '../../services/supermarket';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  
  selectedCategory: string = 'الكل';
  searchQuery: string = '';
  sortBy: string = 'default';

  constructor(
    private supermarketService: SupermarketService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categories = ['الكل', ...this.supermarketService.categories];

    this.supermarketService.getProducts().subscribe({
      next: (data) => {
        this.allProducts = data;
        
        this.route.queryParams.subscribe((params) => {
          this.selectedCategory = params['category'] || 'الكل';
          this.applyFilterAndSort();
        });
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilterAndSort();
  }

  applyFilterAndSort(): void {
    let result = [...this.allProducts];

    // فلترة بالقسم
    if (this.selectedCategory !== 'الكل') {
      result = result.filter((p) => p.category === this.selectedCategory);
    }

    // فلترة بالبحث
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(query) || 
        p.description?.toLowerCase().includes(query)
      );
    }

    // الترتيب
    if (this.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    this.filteredProducts = result;
    this.cdr.markForCheck();
  }

  handleAddToCart(product: Product): void {
    alert(`تمت إضافة "${product.name}" إلى سلة المشتريات! 🛒`);
  }
}