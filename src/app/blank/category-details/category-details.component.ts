import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/category';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
   
  constructor( private _ProductsService:ProductsService,private _ActivatedRoute:ActivatedRoute){}
  id:string|null =''
  categoryDetails:Category={} as Category;

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id')
      }
    })
    this._ProductsService.getCategoryDetails(this.id).subscribe({
      next:(response)=>{
        console.log(response.data); 
       this.categoryDetails =  response.data ;
      }
    })
  }


}
