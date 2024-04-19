import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../../../../entities/products.model';
import { Cart } from '../../../../entities/cart.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
  @Output() addProductToCart: EventEmitter<Cart> = new EventEmitter();
  @Input() products!: Products[];
  quantity:number=1;

  onQuantityChanged(quantity:number){
    this.quantity=quantity;
  }
  onClickAddCart(item:Products){
    const dialogData : Cart = {
      idProduct: item.id || '',
      name: item.name,
      description: item.description,
      price:item.price,
      quantyti: this.quantity,
      imageUrl:item.imageUrl,
    };
    this.addProductToCart.emit(dialogData);
  }

}
