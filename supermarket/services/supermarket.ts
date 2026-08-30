import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  // id: string | number;
  id:any;
  name: string;
  price: number;
  oldPrice?: number;
  // image?: string;
  image: any;
  // category?: string;
  category: any;
description: any;
  rating?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class SupermarketService {
  private dataUrl = 'data/supermarket-products.json';

  readonly categories: string[] = [
    'مشروبات',
    'سناكس',
    'منتجات ألبان',
    'مخبوزات',
    'فواكه',
    'خضروات',
    'مجمدات',
    'معلبات',
    'منظفات منزلية',
    'عناية شخصية'
  ];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (!category || category === 'الكل') {
      return this.getProducts();
    }
    return this.getProducts().pipe(
      map(products => products.filter(p => p.category === category))
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const term = query.trim().toLowerCase();
    if (!term) {
      return this.getProducts();
    }
    return this.getProducts().pipe(
      map(products => products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      ))
    );
  }

  getOffers(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => p.oldPrice && p.oldPrice > p.price))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => (p.rating ?? 0) >= 4.7))
    );
  }
}