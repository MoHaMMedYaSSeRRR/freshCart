import { SearchPipe } from './../../core/Pipes/search.pipe';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { WhishlistService } from 'src/app/core/services/whishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2: Renderer2,
    private _WhishlistService: WhishlistService
  ) { }
  pageSize: number = 0;
  p: number = 0;
  total: number = 0;
  products: Product[] = [];
  term: string = '';
  whishListData: string[] = [];
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.total = response.results;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage
      }
    })

    this._WhishlistService.getLoggedWishlist().subscribe({
      next: (response) => {
        this.whishListData=response.data.map((item:any)=> item._id);
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

  pageChanged(event: any) {
    this._ProductsService.getProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.total = response.results;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage
      }
    })
  }

  addToFav(prodId: any) {
    this._WhishlistService.addToWishlist(prodId).subscribe({
      next: (response) => {
       this._WhishlistService.favNum.next(response.data.length)
        this._toastr.success(response.message);
        this.whishListData = response.data
      },
      error: () => {
        this._toastr.error('Something went wrong');
      }
    })
  }
  removeFromFav(prodId: any) {
    this._WhishlistService.removeFromWhishList(prodId).subscribe({
      next: (response) => {
        this._WhishlistService.favNum.next(response.data.length)
        this._toastr.success(response.message);
        this.whishListData = response.data
      },
      error: () => {
        this._toastr.error('Something went wrong');
      }
    })

  }

}
