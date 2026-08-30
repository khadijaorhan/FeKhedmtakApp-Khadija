import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface GiftCategoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {

  categories: GiftCategoryItem[] = [
    {
      id: 'flowers',
      name: 'ورد',
      icon: '🌹',
      description: 'باقات ورد مناسبة للمناسبات المختلفة.'
    },
    {
      id: 'chocolates',
      name: 'شوكولاتة',
      icon: '🍫',
      description: 'اختيارات متنوعة من الشوكولاتة والهدايا.'
    },
    {
      id: 'perfumes',
      name: 'عطور',
      icon: '🌸',
      description: 'عطور رجالية ونسائية مناسبة للهدايا.'
    },
    {
      id: 'accessories',
      name: 'إكسسوارات',
      icon: '🎀',
      description: 'إكسسوارات بسيطة ومميزة.'
    },
    {
      id: 'male',
      name: 'هدايا رجالية',
      icon: '👨',
      description: 'مجموعة هدايا مناسبة للرجال.'
    },
    {
      id: 'female',
      name: 'هدايا نسائية',
      icon: '👩',
      description: 'مجموعة هدايا مناسبة للنساء.'
    },
    {
      id: 'kids',
      name: 'هدايا أطفال',
      icon: '🧸',
      description: 'هدايا مناسبة للأطفال.'
    }
  ];

  constructor(
    private router: Router
  ) {}

  openCategory(
    categoryId: string
  ): void {

    this.router.navigate(
      ['/gifts/category', categoryId]
    );
  }

  goBack(): void {

    this.router.navigate(
      ['/gifts']
    );
  }
}