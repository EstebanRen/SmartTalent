import { Component } from '@angular/core';
import { AdminStateService } from '../../services/admin/admin-state.service';
import { AdminFacadeService } from '../../services/admin/admin.facade';
import { ProductEditEvent, Products } from '../../entities/products.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  products!: Products[];

  constructor(
    private AdminFacade: AdminFacadeService,
    private AdminState: AdminStateService
  ) {
    this.AdminState.getProducts().subscribe((products: Products[]) => {
      this.products = products;
    });
  }
  addProduct(product:Products){
    this.AdminFacade.addProduct(product);
  }
  editProduct(dataProduct:ProductEditEvent){
    this.AdminFacade.updateSingleProduct(dataProduct);
  }
  deleteProduct(dataProduct:ProductEditEvent){
    this.AdminFacade.deleteProduct(dataProduct);
  }
}
