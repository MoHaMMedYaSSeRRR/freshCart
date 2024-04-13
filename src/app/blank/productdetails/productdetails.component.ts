import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService ,private _CartService:CartService
    , private _toastr: ToastrService,
    private _Renderer2:Renderer2
    ){}
  productid:string|null = '';
  productDetails:any=null;
    ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parms)=>{
        this.productid=parms.get('id');
        }
    })
    this._ProductsService.getProductDetails(this.productid).subscribe({
      next:(response)=>{
        this.productDetails=response.data
      }
    })
  }
  productDetailsOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
    addToCart(id: any, button: HTMLButtonElement) {
    
    this._Renderer2.setAttribute(button , 'disabled', 'true');
    
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._toastr.success(response.message);
        this._Renderer2.removeAttribute(button, 'disabled')
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:()=>{
        this._Renderer2.removeAttribute(button, 'disabled')
      }
    })
  }
}
