import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  apiError:string = "";
  isLoading: boolean = false;
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required ,Validators.email]),
    password:new FormControl(null,[Validators.required ,Validators.pattern(/^[A-z][a-z0-9]{3,}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  } ,{validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(form:FormGroup):void {
    const password = form.get('password');
    const rePassword = form.get('rePassword');
    if(rePassword?.value == '') {
      rePassword.setErrors({required: true})
    }
   if (rePassword?.value!== password?.value){
      rePassword?.setErrors({mismatch: true})
    }
  }

  handleRegister(registerForm:FormGroup){
    this.isLoading=true;
    this._AuthService.Register(registerForm.value).subscribe({
      next:(response)=>{
        if(response.message === "success"){
          this.isLoading=false;
          localStorage.setItem("userToken",response.token);
          this._Router.navigate(['/login']);
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
