import { Product } from './../interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] , term:string): Product[] {
    return products.filter((item) => item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
