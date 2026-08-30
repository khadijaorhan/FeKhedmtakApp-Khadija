import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  GiftProduct
} from '../../models/gift.model';

import {
  GiftsService
} from '../../services/gifts.service';


@Component({
  selector:
    'app-category-products',

  templateUrl:
    './category-products.html',

  styleUrl:
    './category-products.css'
})
export class CategoryProducts
  implements OnInit {

  categoryId =
    '';

  categoryName =
    '';

  categoryIcon =
    '🎁';


  products:
    GiftProduct[] = [];


  loading =
    true;


  constructor(
    private route:
      ActivatedRoute,

    private router:
      Router,

    private giftsService:
      GiftsService
  ) {}


  ngOnInit():
    void {

    this.route
      .paramMap
      .subscribe(
        params => {

          this.categoryId =
            params.get('id') ??
            '';


          this.loadProducts();
        }
      );
  }


  private loadProducts():
    void {

    this.loading =
      true;


    this.giftsService
      .getProducts()
      .subscribe({

        next: products => {

          this.applyCategory(
            products
          );


          this.loading =
            false;
        },


        error: error => {

          console.error(
            'خطأ أثناء تحميل القسم:',
            error
          );


          this.products =
            [];


          this.loading =
            false;
        }

      });
  }


  private applyCategory(
    allProducts:
      GiftProduct[]
  ): void {

    switch (
      this.categoryId
    ) {

      case 'flowers':

        this.categoryName =
          'ورد';

        this.categoryIcon =
          '🌹';

        this.products =
          allProducts.filter(
            product =>
              product.category ===
              'flowers'
          );

        break;


      case 'chocolates':

        this.categoryName =
          'شوكولاتة';

        this.categoryIcon =
          '🍫';

        this.products =
          allProducts.filter(
            product =>
              product.category ===
              'chocolates'
          );

        break;


      case 'perfumes':

        this.categoryName =
          'عطور';

        this.categoryIcon =
          '🌸';

        this.products =
          allProducts.filter(
            product =>
              product.category ===
              'perfumes'
          );

        break;


      case 'accessories':

        this.categoryName =
          'إكسسوارات';

        this.categoryIcon =
          '🎀';

        this.products =
          allProducts.filter(
            product =>
              product.category ===
              'accessories'
          );

        break;


      case 'male':

        this.categoryName =
          'هدايا رجالية';

        this.categoryIcon =
          '👨';

        this.products =
          allProducts.filter(
            product =>
              product.suitableFor
                .includes('male')
          );

        break;


      case 'female':

        this.categoryName =
          'هدايا نسائية';

        this.categoryIcon =
          '👩';

        this.products =
          allProducts.filter(
            product =>
              product.suitableFor
                .includes('female')
          );

        break;


      case 'kids':

        this.categoryName =
          'هدايا أطفال';

        this.categoryIcon =
          '🧸';

        this.products =
          allProducts.filter(
            product =>

              product.suitableFor
                .includes('boy')

              ||

              product.suitableFor
                .includes('girl')
          );

        break;


      default:

        this.categoryName =
          'الهدايا';

        this.categoryIcon =
          '🎁';

        this.products =
          allProducts;

    }
  }


  openProduct(
    productId: string
  ): void {

    this.router.navigate(
      [
        '/gifts/product',
        productId
      ]
    );
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


  get selectedCount():
    number {

    return this.giftsService
      .getSelectedProductsCount();
  }


  goToCustomize():
    void {

    if (
      this.selectedCount === 0
    ) {
      return;
    }


    this.router.navigate(
      [
        '/gifts/customize'
      ]
    );
  }


  goBack():
    void {

    this.router.navigate(
      [
        '/gifts'
      ]
    );
  }

}