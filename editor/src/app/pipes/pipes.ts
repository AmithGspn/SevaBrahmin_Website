import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchString : string): any[] {
    if (!items) {
      return [];
    }
    if (!items || !searchString) {
      return items;
    }

    for ( let key in items) {
        console.log(key)
    }
    return items.filter(singleItem => singleItem.recipientName.toLowerCase().includes(searchString.toLowerCase()) ||
                                      singleItem.occupation.toLowerCase().includes(searchString.toLowerCase()) ||
                                      singleItem.city.toLowerCase().includes(searchString.toLowerCase()));
  }
}