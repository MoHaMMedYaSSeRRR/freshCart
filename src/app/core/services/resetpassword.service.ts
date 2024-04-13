import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private _HttpClient:HttpClient) { }

  forgotPassword(userData:object):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,userData) 
  }

  confirmCode(userCode :number):Observable<any>
  {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, userCode)
  }

  confirmPassword(userData:object):Observable<any>
  {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, userData)
  }
}
