import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  GreetingCardOption
} from '../../models/gift-box.model';


@Component({
  selector: 'app-greeting-card-selector',
  templateUrl: './greeting-card-selector.html',
  styleUrl: './greeting-card-selector.css'
})
export class GreetingCardSelector {

  @Input()
  options: GreetingCardOption[] = [];


  @Input()
  selectedCard: GreetingCardOption | null = null;


  @Output()
  cardSelected =
    new EventEmitter<GreetingCardOption | null>();


  selectCard(
    card: GreetingCardOption
  ): void {

    if (
      this.selectedCard?.id === card.id
    ) {
      this.cardSelected.emit(null);

      return;
    }

    this.cardSelected.emit(card);
  }


  selectNone(): void {

    this.cardSelected.emit(null);
  }


  isSelected(
    id: string
  ): boolean {

    return this.selectedCard?.id === id;
  }

}