import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceCop'
})
export class PriceCopPipe implements PipeTransform {

  transform(value: number): string {
    const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    return formattedPrice;
  }

}
