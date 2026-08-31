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
  selector: 'app-gift-details',

  templateUrl:
    './gift-details.html',

  styleUrl:
    './gift-details.css'
})
export class GiftDetails
  implements OnInit {

  product:
    GiftProduct | null =
      null;


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

    const id =
      this.route
        .snapshot
        .paramMap
        .get('id');


    if (!id) {

      this.router.navigate(
        [
          '/gifts/catalog'
        ]
      );

      return;
    }


    this.loading =
      true;


    this.giftsService
      .getProductById(id)
      .subscribe({

        next: product => {

          if (!product) {

            this.router.navigate(
              [
                '/gifts/catalog'
              ]
            );

            return;
          }


          this.product =
            product;


          this.loading =
            false;
        },


        error: error => {

          console.error(
            'خطأ أثناء تحميل المنتج:',
            error
          );


          this.router.navigate(
            [
              '/gifts/catalog'
            ]
          );
        }

      });
  }


  toggleProduct():
    void {

    if (
      !this.product
    ) {
      return;
    }


    this.giftsService
      .toggleProductSelection(
        this.product
      );
  }


  get isSelected():
    boolean {

    if (
      !this.product
    ) {
      return false;
    }


    return this.giftsService
      .isProductSelected(
        this.product.id
      );
  }


  goToCustomize():
    void {

    if (
      this.giftsService
        .getSelectedProductsCount()
        === 0
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
        '/gifts/catalog'
      ]
    );
  }

}