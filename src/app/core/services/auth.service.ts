import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 userData=new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient , private _Router:Router)
   { 
    if(localStorage.getItem('userToken') !== null)
    {
      this.decodeToken();
    }
    else{
      // this._Router.navigate(['/login']);
    }
  }
  
  isAuthenticated(): boolean {
    return this.userData.getValue() !== null;
  }
  decodeToken() {
    let encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      let decodedToken: any = jwtDecode(encodedToken);
      this.userData.next(decodedToken);
    }
  }
  Register(userData:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,userData)
  }
  Login(userData:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin" ,userData)
  }

  LogOut(){
    this.userData.next(null)
    localStorage.removeItem("userToken");
    this._Router.navigate(['/login']);
  }

  
}
