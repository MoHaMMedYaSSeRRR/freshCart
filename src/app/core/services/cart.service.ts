import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    cartNumber=new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) { }
  myToken: any = {
    token: localStorage.getItem("userToken")
  }
  addToCart(prodId: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId: prodId
    },
    )
  }
  getCartDeatils(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, 
    )
  }
  removeCartItem(id:any): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, 
    )
  }
  updateCount(id:any , count:any): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,  
    {
      "count": count++
    }
    
    )
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`, 
    )
    
  }

  payment(cartid:string|null , orderInfo:object){
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:4200`, {
      shippingAddress:orderInfo
    }
    )
  }
}
