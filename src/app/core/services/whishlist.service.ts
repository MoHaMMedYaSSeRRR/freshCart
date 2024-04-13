import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

    favNum= new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) { }

  addToWishlist(prodId:any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
      productId : prodId
    })
  }

  getLoggedWishlist(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
  }

  removeFromWhishList(prodId:any): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`);
  }

}
