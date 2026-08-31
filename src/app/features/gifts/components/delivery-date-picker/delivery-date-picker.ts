import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';


@Component({
  selector: 'app-delivery-date-picker',

  imports: [
    FormsModule
  ],

  templateUrl: './delivery-date-picker.html',

  styleUrl: './delivery-date-picker.css'
})
export class DeliveryDatePicker {

  @Input()
  deliveryDate: string | null = null;


  @Output()
  deliveryDateChange =
    new EventEmitter<string | null>();


  get minDate(): string {

    const today =
      new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        today.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  updateDate(): void {

    this.deliveryDateChange.emit(
      this.deliveryDate || null
    );
  }

}