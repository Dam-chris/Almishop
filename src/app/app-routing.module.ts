import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/productspage/products.component'; 
import { UsersComponent } from './users/users.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'products', component:ProductsComponent, canActivate:[AuthGuard]},
  {path:'users', component:UsersComponent, canActivate:[AuthGuard]},
  {path:'products/add', component:AddProductComponent, canActivate:[AuthGuard]},
  {path:'products/edit/:id', component:EditProductComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
