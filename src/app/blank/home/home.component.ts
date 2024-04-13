import { Component, OnInit, Renderer2   } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';
import { Category } from 'src/app/core/interfaces/category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _toastr: ToastrService,
    private _Renderer2:Renderer2
    ) { }


  products: Product[] = [];
  categories: Category[] = []
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      }
    })
    this._ProductsService.getCategory().subscribe({
      next: (response) => {
        this.categories = response.data;
      }
    }
    )

  }
  categoryOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  mainSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
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
