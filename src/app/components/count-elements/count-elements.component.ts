import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-count-elements',
  templateUrl: './count-elements.component.html',
  styleUrl: './count-elements.component.css'
})
export class CountElementsComponent {
  @Output() quantityChanged = new EventEmitter<number>();
  quantity: number = 1;
  minValue: number = 1;
  maxValue: number = 50;

  decreaseQuantity() {
    if (this.quantity > this.minValue) {
      this.quantity--;
      this.emitQuantityChanged();
    }

  }
  increaseQuantity() {
    if (this.quantity < this.maxValue) {
      this.quantity++;
      this.emitQuantityChanged();
    }
  }

 emitQuantityChanged() {
    this.quantityChanged.emit(this.quantity);
  }
}
