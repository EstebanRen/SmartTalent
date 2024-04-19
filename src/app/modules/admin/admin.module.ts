import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MaterialAngularModule } from '../../material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModulesModule } from '../../shared/shared-modules.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AdminFacadeService } from '../../services/admin/admin.facade';



@NgModule({
  declarations: [
    AdminComponent,
    AllProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModulesModule,
  ],
  providers: [AdminFacadeService],

})
export class AdminModule { }
