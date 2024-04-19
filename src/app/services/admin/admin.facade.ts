import { Injectable } from '@angular/core';
import { ProductEditEvent, Products } from '../../entities/products.model';
import { AdminService } from './admin.service';
import { AdminStateService } from './admin-state.service';
import { Subscription } from 'rxjs';
import { PupUpMessageComponent } from '../../components/pup-up-message/pup-up-message.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AdminFacadeService {
  products!: Products[];
  subscription!: Subscription;

  constructor(
    private adminService: AdminService,
    private AdminState: AdminStateService,
    private dialog: MatDialog
  ) {
    this.subscription = this.adminService.getAllProduct().subscribe({
      next: (data: Products[]) => {
        this.products = data;
        this.updateProductsList(data);
      },
      error: (error) => {
        this.error('Error al obtener todos los productos')
      },
    });
  }
  updateProductsList(products: Products[]) {
    this.AdminState.setProducts(products);
  }

  addProduct(product: Products) {
    this.adminService.addProduct(product).subscribe({
      next: ref => {
        this.mesagge('Felicitaciones!','Producto agregado')
        this.getAllProducts();
      },
      error: error => {
        this.error('Error al agregar el producto, por favor vuelva a intentar')
      }
    });
  }
  getAllProducts(){
    this.adminService.getAllProduct().subscribe({
      next: ref => {
        this.updateProductsList(ref);
      },
      error: error => {
        this.error('Error al obtener todos los productos')
      }
    })
  }
  updateSingleProduct(dataProduct:ProductEditEvent){
    this.adminService.updateProduct(dataProduct.product,dataProduct.id).subscribe({
      next: ref => {
        this.mesagge('Felicitaciones!','Producto Editado de manera satisfactoria')
        this.getAllProducts();
      },
      error: error => {
        this.error('Error al actualizar el producto, por favor vuelva a intentar')
      }
    });
  }
  deleteProduct(dataProduct:ProductEditEvent){
    this.adminService.deleteProduct(dataProduct.id).subscribe({
      next: ref => {
        this.mesagge('Felicitaciones!','Producto Eliminado de manera satisfactoria')
        this.getAllProducts();
      },
      error: error => {
        this.error('Error al actualizar el producto, por favor vuelva a intentar')
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
}
