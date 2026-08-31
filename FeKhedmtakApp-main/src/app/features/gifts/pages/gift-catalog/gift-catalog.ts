import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  GiftCategory,
  GiftOccasion,
  GiftProduct,
  GiftRecipient
} from '../../models/gift.model';

import {
  GiftsService
} from '../../services/gifts.service';


@Component({
  selector: 'app-gift-catalog',

  imports: [
    FormsModule
  ],

  templateUrl: './gift-catalog.html',

  styleUrl: './gift-catalog.css'
})
export class GiftCatalog implements OnInit {

  allProducts: GiftProduct[] = [];

  baseProducts: GiftProduct[] = [];

  filteredProducts: GiftProduct[] = [];


  searchTerm = '';

  selectedCategory:
    GiftCategory | 'all' = 'all';


  minPrice: number | null = null;

  maxPrice: number | null = null;


  recommendationMode = false;

  priceFilterMode = false;


  recommendationRecipient:
    GiftRecipient | null = null;

  recommendationOccasion:
    GiftOccasion | null = null;


  loading = true;


  categories: {
    id: GiftCategory | 'all';
    name: string;
    icon: string;
  }[] = [

    {
      id: 'all',
      name: 'الكل',
      icon: '🎁'
    },

    {
      id: 'flowers',
      name: 'ورد',
      icon: '🌹'
    },

    {
      id: 'chocolates',
      name: 'شوكولاتة',
      icon: '🍫'
    },

    {
      id: 'perfumes',
      name: 'عطور',
      icon: '🌸'
    },

    {
      id: 'candles',
      name: 'شموع',
      icon: '🕯️'
    },

    {
      id: 'accessories',
      name: 'إكسسوارات',
      icon: '🎀'
    },

    {
      id: 'clothes',
      name: 'ملابس',
      icon: '👕'
    },

    {
      id: 'toys',
      name: 'ألعاب',
      icon: '🧸'
    }

  ];


  constructor(
    private giftsService: GiftsService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {

        this.recommendationMode =
          params['recommendation'] === 'true';


        this.priceFilterMode =
          params['priceFilter'] === 'true';


        const recipient =
          params['recipient'];

        const occasion =
          params['occasion'];


        this.recommendationRecipient =
          this.isRecipient(recipient)
            ? recipient
            : null;


        this.recommendationOccasion =
          this.isOccasion(occasion)
            ? occasion
            : null;


        /*
         * لو المستخدم داخل من الترشيحات
         * نمسح أي فلتر قديم تلقائيًا.
         */
        if (this.recommendationMode) {
          this.resetFilterValues();
        }


        this.loadProducts();
      }
    );
  }


  private loadProducts(): void {

    this.loading = true;


    /*
     * Recommendation Mode
     */
    if (
      this.recommendationMode &&
      this.recommendationRecipient &&
      this.recommendationOccasion
    ) {

      this.giftsService
        .getRecommendedProducts(
          this.recommendationRecipient,
          this.recommendationOccasion
        )
        .subscribe({

          next: products => {

            console.log(
              'Recommended Products:',
              products
            );


            this.allProducts =
              [...products];

            this.baseProducts =
              [...products];


            /*
             * نضمن إن مفيش Filter قديم
             * مأثر على الترشيحات.
             */
            this.resetFilterValues();


            this.applyFilters();


            this.loading = false;


            /*
             * مهم مع الـHTTP:
             * نحدث الشاشة فور وصول البيانات.
             */
            this.cdr.detectChanges();
          },


          error: error => {

            console.error(
              'خطأ أثناء تحميل الترشيحات:',
              error
            );


            this.allProducts = [];

            this.baseProducts = [];

            this.filteredProducts = [];

            this.loading = false;


            this.cdr.detectChanges();
          }

        });


      return;
    }


    /*
     * Normal Catalog
     */
    this.giftsService
      .getProducts()
      .subscribe({

        next: products => {

          console.log(
            'Catalog Products:',
            products
          );


          this.allProducts =
            [...products];

          this.baseProducts =
            [...products];


          this.applyFilters();


          this.loading = false;


          /*
           * تحديث الشاشة مباشرة
           * بعد وصول المنتجات.
           */
          this.cdr.detectChanges();
        },


        error: error => {

          console.error(
            'خطأ أثناء تحميل المنتجات:',
            error
          );


          this.allProducts = [];

          this.baseProducts = [];

          this.filteredProducts = [];

          this.loading = false;


          this.cdr.detectChanges();
        }

      });
  }


  applyFilters(): void {

    this.filteredProducts =
      this.giftsService
        .filterProducts(
          this.baseProducts,
          this.searchTerm,
          this.selectedCategory,
          this.minPrice,
          this.maxPrice
        );
  }


  selectCategory(
    category: GiftCategory | 'all'
  ): void {

    this.selectedCategory =
      category;

    this.applyFilters();
  }


  toggleProduct(
    product: GiftProduct
  ): void {

    this.giftsService
      .toggleProductSelection(
        product
      );
  }


  isSelected(
    productId: string
  ): boolean {

    return this.giftsService
      .isProductSelected(
        productId
      );
  }


  get selectedCount(): number {

    return this.giftsService
      .getSelectedProductsCount();
  }


  get selectedTotal(): number {

    return this.giftsService
      .getSelectedProductsTotal();
  }


  clearFilters(): void {

    this.resetFilterValues();

    this.applyFilters();
  }


  private resetFilterValues(): void {

    this.searchTerm = '';

    this.selectedCategory = 'all';

    this.minPrice = null;

    this.maxPrice = null;
  }


  goToCustomize(): void {

    if (
      this.selectedCount === 0
    ) {
      return;
    }


    this.router.navigate(
      ['/gifts/customize']
    );
  }


  private isRecipient(
    value: string | undefined
  ): value is GiftRecipient {

    return [
      'male',
      'female',
      'boy',
      'girl'
    ].includes(
      value ?? ''
    );
  }


  private isOccasion(
    value: string | undefined
  ): value is GiftOccasion {

    return [
      'birthday',
      'anniversary',
      'graduation',
      'congratulations',
      'thanks',
      'love',
      'apology',
      'none'
    ].includes(
      value ?? ''
    );
  }

}