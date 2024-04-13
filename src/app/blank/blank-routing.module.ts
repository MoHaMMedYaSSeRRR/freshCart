import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AllordersComponent } from './allorders/allorders.component';
import { BrandsComponent } from './brands/brands.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { PaymentComponent } from './payment/payment.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { WhishlistComponent } from './whishlist/whishlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'home', component: HomeComponent},
  { path:'cart',component: CartComponent},
  { path:'products', component: ProductsComponent},
  { path:'allorders', component: AllordersComponent},
  { path:'brands', component: BrandsComponent},
  {path:'categories', component: CategoriesComponent},
  {path:'whishlist', component: WhishlistComponent},
  {path:'forgotPassword', component: ForgotPasswordComponent},
  { path:'productdetails/:id', component: ProductdetailsComponent},
  { path:'categorydetails/:id', component: CategoryDetailsComponent},
  { path:'payment/:cartid', component: PaymentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankRoutingModule { }
