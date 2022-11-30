import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-change',
  templateUrl: './currency-change.component.html',
  styleUrls: ['./currency-change.component.scss']
})
export class CurrencyChangeComponent {
  @Output() currencyChanger: EventEmitter<number> = new EventEmitter<number>;


  changeCurrency(currency: number): void {
    this.currencyChanger.emit(currency);
  }

}
