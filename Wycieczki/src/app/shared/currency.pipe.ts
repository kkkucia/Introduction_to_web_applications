import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  private euro: number = 0.18;
  private dolar: number = 0.23;

  transform(price: number, arg: number = 0): string {
    let currPrice: number;
    let newCurrency: string;

    switch (arg) {
      case 1: {
        currPrice = Math.round(price * this.euro * 100) / 100;
        newCurrency = "€";
        break;
      }
      case 2: {
        currPrice = Math.round(price * this.dolar * 100) / 100;
        newCurrency = "$";
        break;
      } default: {
        currPrice = Math.round(price * 100) / 100;
        newCurrency = "PLN";
        break;
      }
    }
    return currPrice + ' ' + newCurrency;
  }

}


