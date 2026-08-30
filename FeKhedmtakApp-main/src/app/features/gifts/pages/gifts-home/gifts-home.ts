import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gifts-home',
  templateUrl: './gifts-home.html',
  styleUrl: './gifts-home.css'
})
export class GiftsHome {

  showCategories = false;

  constructor(private router: Router) {}

  goToRecommendation(): void {
    this.router.navigate(['/gifts/recommend']);
  }

  goToCatalog(): void {
    this.router.navigate(['/gifts/catalog']);
  }

  goToPriceFilter(): void {
    this.router.navigate(
      ['/gifts/catalog'],
      {
        queryParams: {
          priceFilter: 'true'
        }
      }
    );
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
  }

  openCategory(category: string): void {
    this.router.navigate(
      ['/gifts/category', category]
    );
  }
}