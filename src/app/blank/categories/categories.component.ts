import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/core/interfaces/category';
import { ProductsService } from 'src/app/core/services/products.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ProductsService: ProductsService) { }
  categories: Category[] = []
  ngOnInit(): void {
    this._ProductsService.getCategory().subscribe({
      next:(response)=> {
        this.categories=response.data;
      }
    }
    )
  }

}

