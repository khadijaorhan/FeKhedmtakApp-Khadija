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
  selector: 'app-gift-message',

  imports: [
    FormsModule
  ],

  templateUrl: './gift-message.html',

  styleUrl: './gift-message.css'
})
export class GiftMessage {

  @Input()
  message = '';


  @Input()
  maxLength = 250;


  @Output()
  messageChange =
    new EventEmitter<string>();


  updateMessage(): void {

    this.messageChange.emit(
      this.message
    );
  }

}