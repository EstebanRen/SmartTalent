import { Injectable } from '@angular/core';
import { Products } from '../../entities/products.model';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../../entities/cart.model';

interface State {
  products: Products[];
  itemsCart:Cart[];
  error: unknown;
}

@Injectable({
  providedIn: 'root'
})

export class HomeStateService {
  #state = new BehaviorSubject<State>({
    products:[],
    itemsCart:[],
    error:null
  })

  getProducts() {
    return this.#state.asObservable().pipe(map((state) => state.products));
  }
  getItemsCart() {
    return this.#state.asObservable().pipe(map((state) => state.itemsCart));
  }
  getError() {
    return this.#state.asObservable().pipe(map((state) => state.error));
  }
  setProducts(products: Products[]) {
    this.#state.next({
      ...this.#state.value,
      products,
    });
  }
  setItemsCart(itemsCart: Cart[]) {
    this.#state.next({
      ...this.#state.value,
      itemsCart:itemsCart,
    });
  }
  setError(error: unknown) {
    this.#state.next({
      ...this.#state.value,
      error,
    });
  }
}
