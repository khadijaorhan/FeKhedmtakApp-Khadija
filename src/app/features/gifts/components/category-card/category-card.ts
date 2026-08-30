import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.html',
  styleUrl: './category-card.css'
})
export class CategoryCard {

  @Input()
  id = '';


  @Input()
  name = '';


  @Input()
  icon = '🎁';


  @Input()
  description = '';


  @Output()
  categorySelected =
    new EventEmitter<string>();


  selectCategory(): void {

    this.categorySelected.emit(
      this.id
    );
  }

}