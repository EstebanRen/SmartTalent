import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { MaterialAngularModule } from '../../material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModulesModule } from '../../shared/shared-modules.module';
import { HomeFacadeService } from '../../services/home/home.facade';



@NgModule({
  declarations: [
    HomeComponent,
    ListProductsComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    RouterModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModulesModule,
  ],
  providers: [HomeFacadeService],
})
export class HomeModule { }
