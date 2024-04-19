import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Products } from '../../entities/products.model';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.css',
})
export class FormProductsComponent {
  Form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Products,
    protected dialogRef: MatDialogRef<FormProductsComponent>
  ) {
    this.Form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      imageUrl: new FormControl(''),
      availableQuantity: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      category: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.initInfo();
  }
  initInfo() {
    if (this.data != undefined) {
      let categoryValue: string;

      switch (true) {
        case this.data.frut:
          categoryValue = 'fruta';
          break;
        case this.data.vegetable:
          categoryValue = 'verdura';
          break;
        case this.data.other:
          categoryValue = 'otros';
          break;
        default:
          categoryValue = 'otros'; // Por defecto
          break;
      }
      this.Form.patchValue({
        name: this.data.name,
        description: this.data.description,
        price: this.data.price,
        availableQuantity: this.data.availableQuantity,
        imageUrl: this.data.imageUrl,
        category: categoryValue,
      });
    }
  }
  onClickEditateContact() {
    const dialogData = {
      product: this.formatProduct(),
      id: this.data.id
    };
    this.dialogRef.close(dialogData);
  }

  onClickAddProduct() {
    let dataProduct = this.formatProduct();
    this.dialogRef.close(dataProduct);
  }
  formatProduct() {
    const categoria = this.Form.get('category')?.value;

    let frut = false;
    let vegetable = false;
    let other = false;

    switch (categoria) {
      case 'fruta':
        frut = true;
        break;
      case 'verdura':
        vegetable = true;
        break;
      case 'otros':
        other = true;
        break;
    }

    const dataProduct: Products = {
      name: this.Form.get('name')?.value,
      description: this.Form.get('description')?.value,
      frut: frut,
      vegetable: vegetable,
      other: other,
      price: this.Form.get('price')?.value,
      availableQuantity: this.Form.get('availableQuantity')?.value,
      imageUrl: this.Form.get('imageUrl')?.value,
    };

    return dataProduct;
  }
}
