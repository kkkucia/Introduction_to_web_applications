import { Component } from '@angular/core';
import { BusketHandlingService } from '../services/busket-handling.service';

@Component({
  selector: 'app-currency-change',
  templateUrl: './currency-change.component.html',
  styleUrls: ['./currency-change.component.scss']
})
export class CurrencyChangeComponent {

  constructor(private currencyHandler: BusketHandlingService) { }

  changeCurrency(currency: number): void {
    this.currencyHandler.changeCurency(currency);

  }

}
