import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebaseService/firebase.service';
import { Products } from '../../entities/products.model';
import { FirebaseTables } from '../../enums/firebase-tables.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends FirebaseService<Products>  {

  constructor(
  ) {
    super(FirebaseTables.Products);
  }
  addProduct(products: Omit<Products, 'id'>) {
    return this.db.create(products);
  }
  getAllProduct(){
    return this.db.all();
  }
  updateProduct(product:Products,id:string){
    return this.db.update(id,product);
  }
  deleteProduct(id:string){
    return this.db.delete(id);
  }
}
