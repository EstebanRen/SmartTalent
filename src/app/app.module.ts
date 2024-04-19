import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProductsComponent } from './components/form-products/form-products.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteItemsComponent } from './components/delete-items/delete-items.component';
import { SharedModulesModule } from './shared/shared-modules.module';
import { PupUpMessageComponent } from './components/pup-up-message/pup-up-message.component';

@NgModule({
  declarations: [
    AppComponent,
    FormProductsComponent,
    DeleteItemsComponent,
    PupUpMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModulesModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
