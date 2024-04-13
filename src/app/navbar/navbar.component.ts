import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { CartService } from '../core/services/cart.service';
import { WhishlistService } from '../core/services/whishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{ 
  constructor(private _authService:AuthService , 
    private _CartService:CartService ,
     private _Renderer2:Renderer2,
     private _WhishlistService:WhishlistService
     
     ) {
      this._authService.userData.subscribe( ()=>{
          if(this._authService.userData.getValue()){
            this.islogin=true;
          }
          else{
            this.islogin=false;
          } 
      })
   }
   itemNumber:number =0
   islogin: boolean = false;
   favNum: number = 0;

  @ViewChild('navBar') element!:ElementRef

  @HostListener('window:scroll')
  onScroll(){ 
    if(scrollY > 300){
      this._Renderer2.addClass(this.element.nativeElement, 'px-5');
     
    }else {
      this._Renderer2.removeClass(this.element.nativeElement, 'px-5');
    }
  }

  ngOnInit(): void {
      this._authService.userData.subscribe({
        next:()=>{
          if(this._authService.userData.getValue()==null){
            this.islogin=false;
          }
          else{
            this.islogin=true;
          }
        }
      })
      this._CartService.getCartDeatils().subscribe({
        next:(response)=>{
          this.itemNumber=response.numOfCartItems;
        }
      })
      this._CartService.cartNumber.subscribe({
        next:(response)=>{
          this.itemNumber=response;
        }
      })
    this._WhishlistService.getLoggedWishlist().subscribe({
    next:(response)=>{
        this.favNum=response.count;
    }
    })
      this._WhishlistService.favNum.subscribe({
        next:(response)=>{
          this.favNum=response;
        }
      })  
      }

logOut(){
  this._authService.LogOut();
}

}
