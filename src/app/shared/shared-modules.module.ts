import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../modules/navbar/navbar.component';
import { CountElementsComponent } from '../components/count-elements/count-elements.component';
import { PriceCopPipe } from '../pipes/price-cop.pipe';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CountElementsComponent,
    PriceCopPipe,
    NavbarComponent
  ],
  imports: [CommonModule, MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,],
  exports:[
    CountElementsComponent,
    PriceCopPipe,
    NavbarComponent
  ]
})
export class SharedModulesModule { }
