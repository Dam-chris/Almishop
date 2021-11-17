import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './productspage/products.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SeeProductComponent } from './see-product/see-product.component';



@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    SeeProductComponent,
    SeeProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ],
  exports:[
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    SeeProductComponent
  ],
  providers:[DatePipe]
})
export class ProductModule { }
