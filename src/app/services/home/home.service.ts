import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebaseService/firebase.service';
import { Products } from '../../entities/products.model';
import { FirebaseTables } from '../../enums/firebase-tables.enum';
import { Cart } from '../../entities/cart.model';
import { Order } from '../../entities/order.model';

@Injectable({
  providedIn: 'root'
})

export class HomeService extends FirebaseService<Products> {

  constructor(
  ) {
    super(FirebaseTables.Products);
  }
  getAllProduct() {
    return this.db.all();
  }
}

@Injectable({
  providedIn: 'root'
})

export class CartService extends FirebaseService<Cart> {
  constructor(
  ) {
    super(FirebaseTables.Cart);
  }
  addItemCart(itemsCart: Omit<Cart, 'id'>) {
    return this.db.create(itemsCart);
  }
  getAllItemsCart() {
    return this.db.all();
  }
  deleteProduct(id:string){
    return this.db.delete(id);
  }
}
@Injectable({
  providedIn: 'root'
})

export class OrderService extends FirebaseService<Order> {
  constructor(
  ) {
    super(FirebaseTables.Order);
  }
  addItemOrder(itemsCart: Omit<Order, 'id'>) {
    return this.db.create(itemsCart);
  }
}

