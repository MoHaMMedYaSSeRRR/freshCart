import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { MyhttpInterceptor } from './core/interceptors/myhttp.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot()
    
  ],
  providers: [
   { provide:HTTP_INTERCEPTORS ,useClass:MyhttpInterceptor , multi:true },
   { provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
