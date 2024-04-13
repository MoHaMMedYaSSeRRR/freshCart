import { SearchPipe } from './../core/Pipes/search.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuttextPipe } from './../core/Pipes/cuttext.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankRoutingModule } from './blank-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PaymentComponent } from './payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    BrandsComponent,
    ProductsComponent,
    ProductdetailsComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    CuttextPipe,
    PaymentComponent,
    AllordersComponent,
    ForgotPasswordComponent,
    SearchPipe,
    WhishlistComponent
  ],
  imports: [
    CommonModule,
    BlankRoutingModule,
    CarouselModule ,
    FormsModule ,
    ReactiveFormsModule  ,
    NgxPaginationModule
    ]
})
export class BlankModule { }
