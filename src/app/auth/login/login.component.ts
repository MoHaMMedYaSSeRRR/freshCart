import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  apiError:string = "";
  isLoading: boolean = false;
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required ,Validators.email]),
    password:new FormControl(null,[Validators.required]),
  })



  handlelogin(registerForm:FormGroup){
    this.isLoading=true;
    this._AuthService.Login(registerForm.value).subscribe({
      next:(response)=>{
        if(response.message === "success"){
          this.isLoading=false;
          localStorage.setItem("userToken",response.token);
          this._AuthService.decodeToken();
          this._Router.navigate(['/home']);
        }
      },
      error:(err)=>{
        this.isLoading=false;
        this.apiError=err.error.message;
        console.log(this.apiError);
        }
    })
  }

}
