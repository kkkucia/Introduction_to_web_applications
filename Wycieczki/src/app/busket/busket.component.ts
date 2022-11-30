import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.scss']
})
export class BusketComponent implements OnChanges{

  @Input() travelCounter: number;
  @Input() currency: number;
  @Input() chosenTravels: Map<string,  number>;
  @Input() allCost: number;
  @Input() euro: number;
  @Input() dolar: number;
  currAllCost: number;
  busketOn: boolean = false;
  currencySign: string = 'PLN';

  ngOnChanges(changes: SimpleChanges): void {
    switch(this.currency){
      case 1: {
        this.currAllCost = Math.round(this.allCost * this.euro * 100) / 100;
        this.currencySign = "€";
        break;
      }
      case 2: {
        this.currAllCost = Math.round(this.allCost * this.dolar * 100) / 100;
        this.currencySign = "$";
        break;
      } default: {
        this.currAllCost = Math.round(this.allCost * 100) / 100;
        this.currencySign = "PLN";
        break;
      }
    }
  }


  showAndHideBusket():void{
      this.busketOn = !this.busketOn;
  }

}
