import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetpasswordService } from 'src/app/core/services/resetpassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private _ResetpasswordService: ResetpasswordService,
    private _Router: Router
  ) { }

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  errorMessage: string = '';

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl(null)
  })
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null)
  })

  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl(null)
  })

  forgotPassword() {
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;
    this._ResetpasswordService.forgotPassword(userEmail).subscribe({
      next: (response) => {
    this.errorMessage='';
        if (response.statusMsg == 'success') {
          this.step1 = false;
          this.step2 = true;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    })

  }
  confirmCode() {
    this._ResetpasswordService.confirmCode(this.codeForm.value).subscribe({
      next: (response) => {
        this.errorMessage='';
        this.step2 = false;
        this.step3 = true;

      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }
  confirmPassword() {
    let data = this.resetPassword.value;
    data.email = this.email;
    this._ResetpasswordService.confirmPassword(data).subscribe({
      next: (response) => {
          localStorage.setItem("userToken", response.token)
           this.step3 = false;
           this._Router.navigate(['/home'])
           this.errorMessage='';
        
      },
      error: (err) => {
        console.log(err)
        this.errorMessage = err.error.message;
      }
    })
  }


}
