export interface Products {
  id?:string;
  name: string;
  description: string;
  frut:boolean;
  vegetable: boolean;
  other: boolean;
  price:number;
  availableQuantity:number;
  imageUrl:string
}

export type ProductEditEvent = {
  product: Products;
  id: string;
};
