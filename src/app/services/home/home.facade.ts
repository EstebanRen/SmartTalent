import { Injectable } from '@angular/core';
import { Products } from '../../entities/products.model';
import { Observable, Subscription, combineLatest, forkJoin } from 'rxjs';
import { CartService, HomeService, OrderService } from './home.service';
import { HomeStateService } from './home-state.service';
import { Cart, addCart } from '../../entities/cart.model';
import { Order } from '../../entities/order.model';
import { PupUpMessageComponent } from '../../components/pup-up-message/pup-up-message.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class HomeFacadeService {
  products!: Products[];
  productsCart!: Cart[];
  subscription!: Subscription;

  constructor(
    private homeService: HomeService,
    private cartService: CartService,
    private homeState: HomeStateService,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {
    this.subscription = combineLatest([
      this.homeService.getAllProduct(),
      this.cartService.getAllItemsCart(),
    ]).subscribe(([products, productsCart]) => {
      this.products = products;
      this.productsCart = productsCart;
      this.updateProductsList(products);
      this.updateCartList(productsCart);
    });
  }
  updateProductsList(products: Products[]) {
    this.homeState.setProducts(products);
  }
  addProductToCart(dataCart: Cart) {
    this.cartService.addItemCart(dataCart).subscribe({
      next: (ref) => {
        this.mesagge('Felicitaciones!','Producto Agregado al carrito');
        this.getAllItemsCart();
      },
      error: (error) =>   {
        this.error('Error al agregar el producto');
      },
    });
  }
  getAllItemsCart() {
    this.cartService.getAllItemsCart().subscribe({
      next: (ref) => {
        this.updateCartList(ref);
      },
      error: (error) => {
        this.error('Error al traer los productos, por favor vuelva a intentar');
      },
    });
  }
  updateCartList(itemsCart: Cart[]) {
    this.homeState.setItemsCart(itemsCart);
  }
  deleteProductToCart(item: Cart) {
    this.cartService.deleteProduct(item.id || '').subscribe({
      next: () => {
        this.getAllItemsCart();
      },
      error: (error) => {
        this.error('Error al Eliminado los productos del carrito, por favor vuelva a intentar');
      },
    });
  }
  addOrder() {

    const dataOrder: Order = {
      product: this.productsCart,
    };
    this.orderService.addItemOrder(dataOrder).subscribe({
      next: (ref) => {
        this.mesagge('Felicitaciones!','Orden en proceso');
        this.deleteAllItemsCart();
      },
      error: (error) => {
        this.error('Error al generar la orden, por favor vuelva a intentar ');
      },
    });
  }
  deleteAllItemsCart() {
    const deletePromises: Observable<any>[] = [];

    this.productsCart.forEach((item) => {
      const deleteObservable = this.deleteProductToCart(item);
    });
    this.getAllItemsCart();
  }
  mesagge(title:string,message:string): void {
    const dialogRef = this.dialog.open(PupUpMessageComponent, {
      width: '50%',
      panelClass: 'modal-pricing-plans-page',
      data: {
        title: title,
        message: message,
      }
    });
  }
  error(error: string): void {
    const dialogRef = this.dialog.open(PupUpMessageComponent, {
      width: '50%',
      panelClass: 'modal-pricing-plans-page',
      data: {
        title: 'Upss!',
        message: error,
      }
    });
  }
}
