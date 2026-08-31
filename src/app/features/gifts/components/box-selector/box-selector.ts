import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  GiftBoxOption
} from '../../models/gift-box.model';


@Component({
  selector: 'app-box-selector',
  templateUrl: './box-selector.html',
  styleUrl: './box-selector.css'
})
export class BoxSelector {

  @Input()
  boxes: GiftBoxOption[] = [];


  @Input()
  selectedBox: GiftBoxOption | null = null;


  @Output()
  boxSelected =
    new EventEmitter<GiftBoxOption>();


  selectBox(
    box: GiftBoxOption
  ): void {

    this.boxSelected.emit(box);
  }


  isSelected(
    boxId: string
  ): boolean {

    return this.selectedBox?.id === boxId;
  }

}