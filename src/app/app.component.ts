import { Component, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService: AuthService , private _Renderer2:Renderer2 ) {}
  @ViewChild('scrollBtn') element!:ElementRef

  @HostListener('window:scroll')
  hideBtn(){
    if(scrollY > 300){
      this._Renderer2.removeClass(this.element.nativeElement,'d-none')
    }
    else{
      this._Renderer2.addClass(this.element.nativeElement,'d-none')
    }
  }


  scrollToTop(){
    window.scrollTo(0,0);
  }
}
