import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProductEditEvent, Products } from '../../../../entities/products.model';
import { MatDialog } from '@angular/material/dialog';
import { FormProductsComponent } from '../../../../components/form-products/form-products.component';
import { DeleteItemsComponent } from '../../../../components/delete-items/delete-items.component';
import { PupUpMessageComponent } from '../../../../components/pup-up-message/pup-up-message.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})

export class AllProductsComponent implements AfterViewInit, OnChanges {
  @Input() products!: Products[];
  @Output() addProduct: EventEmitter<Products> = new EventEmitter();
  @Output() editProduct: EventEmitter<ProductEditEvent> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<ProductEditEvent> = new EventEmitter();

  displayedColumns: string[] = ['Nombre', 'Descripción', 'Precio', 'Cantidad','Tipo','Acciones'];
  dataSource = new MatTableDataSource<Products>();
  selectedItem!: Products;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private dialog: MatDialog){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && changes['products'].currentValue) {
      this.dataSource.data = changes['products'].currentValue;
    }
  }
  onClickAddProduct() {
    const dialogRef = this.dialog.open(FormProductsComponent, {
      width: '50%',
      panelClass: 'modal-pricing-plans-page',
    }).afterClosed().subscribe((res:Products) => {
      if (res) {
        this.addProduct.emit(res);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onClickDeleteProduct(){
    const dialogRef = this.dialog.open(DeleteItemsComponent, {
      width: '50%',
      panelClass: 'modal-pricing-plans-page',
    }).afterClosed().subscribe((res:string) => {
      if (res=='delete') {
        const dialogData = {
          product: this.selectedItem,
          id: this.selectedItem.id || ''
        };
        this.deleteProduct.emit(dialogData);
      }
    });

  }
  onClickEditProduct(){
    const dialogRef = this.dialog.open(FormProductsComponent, {
      width: '50%',
      panelClass: 'modal-pricing-plans-page',
      data: this.selectedItem,
    }).afterClosed().subscribe((res:ProductEditEvent) => {
      if (res) {
        this.editProduct.emit(res);
      }
    });
  }
  error(error: any): void {
    const dialogRef = this.dialog.open(PupUpMessageComponent, {
      width: '100%',
      panelClass: 'modal-pricing-plans-page',
      data: {
        title: 'Upss!',
        message: 'Estamos teniendo problemas técnicos, por favor espera mientras traemos tus vuelos de vuelta',
      }
    });
  }
}

