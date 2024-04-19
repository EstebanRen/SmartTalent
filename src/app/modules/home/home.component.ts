import { Component } from '@angular/core';
import { HomeStateService } from '../../services/home/home-state.service';
import { HomeFacadeService } from '../../services/home/home.facade';
import { Products } from '../../entities/products.model';
import { Cart, addCart } from '../../entities/cart.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products!: Products[];
  itemsCart!:Cart[];
  constructor(
    private homeFacade: HomeFacadeService,
    private homeState: HomeStateService
  ) {
    combineLatest([
      this.homeState.getProducts(),
      this.homeState.getItemsCart()
    ]).subscribe(([products, itemsCart]) => {
      this.products = products;
      this.itemsCart = itemsCart;
    });
  }
  addProductToCart(item:Cart){
    this.homeFacade.addProductToCart(item);
  }
  deleteProductToCart(item:Cart){
    this.homeFacade.deleteProductToCart(item);
  }
  addOrder(){
    this.homeFacade.addOrder();
  }
}
