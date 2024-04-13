import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { WhishlistService } from 'src/app/core/services/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.scss']
})
export class WhishlistComponent implements OnInit {
  constructor(private _WhishlistService: WhishlistService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2

  ) { }

  products: Product[] = [];
  whishListData: string[] = [];

  ngOnInit(): void {
    this._WhishlistService.getLoggedWishlist().subscribe({
      next: (response) => {
        this.products = response.data
        this.whishListData = response.data.map((item: any) => item._id);

      }
    })
     
  }
  addToCart(id: any, button: HTMLButtonElement) {

    this._Renderer2.setAttribute(button, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._toastr.success(response.message);
        this._Renderer2.removeAttribute(button, 'disabled')
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error: () => {
        this._Renderer2.removeAttribute(button, 'disabled')
      }
    })
  }
  addToFav(prodId: any) {
    this._WhishlistService.addToWishlist(prodId).subscribe({
      next: (response) => {
        this._toastr.success(response.message)
        this.whishListData = response.data.map((item:any) => item._id)
        this.products = response.data
        this._WhishlistService.favNum.next(response.data.length)

      },
      error: () => {
        this._toastr.error('Something went wrong');
      }
    })
  }
  removeFromFav(prodId: any) {
    this._WhishlistService.removeFromWhishList(prodId).subscribe({
      next: (response) => {
        this._toastr.success(response.message);
        this._WhishlistService.favNum.next(response.data.length)
        this.whishListData = response.data;
        const newdata= this.products.filter((item:any)=> this.whishListData.includes(item._id))
        this.products=newdata;
      },
      error: () => {
        this._toastr.error('Something went wrong');
      }
    })

  }

} 
