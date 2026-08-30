import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  WrappingOption
} from '../../models/gift-box.model';


@Component({
  selector: 'app-wrapping-selector',
  templateUrl: './wrapping-selector.html',
  styleUrl: './wrapping-selector.css'
})
export class WrappingSelector {

  @Input()
  options: WrappingOption[] = [];


  @Input()
  selectedWrapping: WrappingOption | null = null;


  @Output()
  wrappingSelected =
    new EventEmitter<WrappingOption | null>();


  selectWrapping(
    wrapping: WrappingOption
  ): void {

    if (
      this.selectedWrapping?.id === wrapping.id
    ) {
      this.wrappingSelected.emit(null);

      return;
    }

    this.wrappingSelected.emit(wrapping);
  }


  selectNone(): void {

    this.wrappingSelected.emit(null);
  }


  isSelected(
    id: string
  ): boolean {

    return this.selectedWrapping?.id === id;
  }

}