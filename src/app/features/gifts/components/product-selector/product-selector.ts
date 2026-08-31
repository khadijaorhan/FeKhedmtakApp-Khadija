import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  GiftProduct
} from '../../models/gift.model';


@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.html',
  styleUrl: './product-selector.css'
})
export class ProductSelector {

  @Input()
  products: GiftProduct[] = [];


  @Input()
  selectedProducts: GiftProduct[] = [];


  @Output()
  productToggle =
    new EventEmitter<GiftProduct>();


  isSelected(
    productId: string
  ): boolean {

    return this.selectedProducts.some(
      product =>
        product.id === productId
    );
  }


  toggleProduct(
    product: GiftProduct
  ): void {

    this.productToggle.emit(
      product
    );
  }

}