import { Injectable } from '@angular/core';
import { Products } from '../../entities/products.model';
import { BehaviorSubject, map } from 'rxjs';


interface State {
  products: Products[];
  error: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AdminStateService {
  #state = new BehaviorSubject<State>({
    products:[],
    error:null
  })

  getProducts() {
    return this.#state.asObservable().pipe(map((state) => state.products));
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
  setError(error: unknown) {
    this.#state.next({
      ...this.#state.value,
      error,
    });
  }
}
