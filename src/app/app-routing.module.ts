import { authGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:'',canActivate:[authGuard] ,loadChildren: ()=>import('./blank/blank.module').then(m=>m.BlankModule)},
  {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
