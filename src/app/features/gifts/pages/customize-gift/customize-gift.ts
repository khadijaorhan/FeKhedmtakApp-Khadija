import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  GiftBoxOption
} from '../../models/gift-box.model';

import {
  GiftProduct
} from '../../models/gift.model';

import {
  GiftsService
} from '../../services/gifts.service';


@Component({
  selector: 'app-customize-gift',
  templateUrl: './customize-gift.html',
  styleUrl: './customize-gift.css'
})
export class CustomizeGift implements OnInit {

  boxes: GiftBoxOption[] = [];

  selectedProducts: GiftProduct[] = [];

  selectedBox: GiftBoxOption | null = null;

  loading = true;

  errorMessage = '';


  constructor(
    private giftsService: GiftsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.selectedProducts =
      this.giftsService.getSelectedProducts();

    this.selectedBox =
      this.giftsService.getSelectedBox();


    if (
      this.selectedProducts.length === 0
    ) {

      this.router.navigate(
        ['/gifts/catalog']
      );

      return;
    }


    this.loadBoxes();
  }


  private loadBoxes(): void {

    this.loading = true;

    this.errorMessage = '';

    this.boxes = [];


    this.giftsService
      .getBoxes()
      .subscribe({

        next: boxes => {

          console.log(
            'Boxes loaded from API:',
            boxes
          );


          this.boxes = boxes;

          this.loading = false;


          if (
            this.boxes.length === 0
          ) {

            this.errorMessage =
              'لا توجد صناديق متاحة حاليًا.';
          }


          this.cdr.detectChanges();
        },


        error: error => {

          console.error(
            'خطأ أثناء تحميل الصناديق:',
            error
          );


          this.boxes = [];

          this.loading = false;

          this.errorMessage =
            'تعذر تحميل الصناديق. تأكد من تشغيل JSON Server.';


          this.cdr.detectChanges();
        }

      });
  }


  selectBox(
    box: GiftBoxOption
  ): void {

    this.giftsService.selectBox(
      box
    );

    this.selectedBox =
      box;
  }


  isSelected(
    boxId: string
  ): boolean {

    return (
      this.selectedBox?.id ===
      boxId
    );
  }


  get productsTotal(): number {

    return this.giftsService
      .getSelectedProductsTotal();
  }


  get finalTotal(): number {

    return (
      this.productsTotal +
      (
        this.selectedBox?.price ??
        0
      )
    );
  }


  goBack(): void {

    this.router.navigate(
      ['/gifts/catalog']
    );
  }


  goToPreview(): void {

    if (
      !this.selectedBox
    ) {
      return;
    }


    this.router.navigate(
      ['/gifts/preview']
    );
  }


  retryLoadingBoxes(): void {

    this.loadBoxes();
  }

}