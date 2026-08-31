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
  selector: 'app-gift-card',
  templateUrl: './gift-card.html',
  styleUrl: './gift-card.css'
})
export class GiftCard {

  @Input({
    required: true
  })
  product!: GiftProduct;


  @Input()
  selected = false;


  @Output()
  selectProduct =
    new EventEmitter<GiftProduct>();


  @Output()
  openProduct =
    new EventEmitter<string>();


  toggleSelection(): void {

    this.selectProduct.emit(
      this.product
    );
  }


  openDetails(): void {

    this.openProduct.emit(
      this.product.id
    );
  }

}