import { CartService } from 'src/app/core/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) {
  }
  cartDetails: any = null
  ngOnInit() {
    this._CartService.getCartDeatils().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      }
    })
  }

  removeItem(id: string) {
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._CartService.cartNumber.next(response.numOfCartItems);
      }
    })
  }
  //   confirmRemoveItem(itemId: string): void {
  //     const confirmRemove = confirm('Are you sure you want to remove this item from your cart?');

  //     if (confirmRemove) {
  //         // Call your actual removeItem method here
  //         this.removeItem(itemId);
  //     }
  // }

  updateCount(id: string, count: number) {
    if(count>0){
      this._CartService.updateCount(id, count).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
        }
      })
    }
    else{
      this.removeItem(id);
    }
   
  }

  clearCart(){
   
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        if(response.message=='success'){
          this.cartDetails=null;
          this._CartService.cartNumber.next(0);
        }
      }
    })
  }
}
