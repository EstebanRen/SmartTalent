import { Products } from "./products.model";

export interface addCart {
  product: Products;
  quantyti: number;
}
export interface Cart {
  id?: string;
  idProduct: string;
  name: string;
  description: string;
  price:number;
  quantyti: number;
  imageUrl:string
}
