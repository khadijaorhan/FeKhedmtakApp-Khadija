import {
  Component,
  Input
} from '@angular/core';


@Component({
  selector: 'app-gift-summary',
  templateUrl: './gift-summary.html',
  styleUrl: './gift-summary.css'
})
export class GiftSummary {

  @Input()
  boxPrice = 0;


  @Input()
  productsPrice = 0;


  @Input()
  wrappingPrice = 0;


  @Input()
  cardPrice = 0;


  get totalPrice(): number {

    return (
      this.boxPrice +
      this.productsPrice +
      this.wrappingPrice +
      this.cardPrice
    );
  }

}