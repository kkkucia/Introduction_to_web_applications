import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';
import { ITravel } from '../interfaces/travel';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges{

  @Input() travel: ITravel;
  @Input() places: number;
  @Input() color: string;
  @Input() idx: number;
  @Input() highPrice: number;
  @Input() lowPrice: number;
  @Input() currency: number;
  @Input() chosenTravels: Map<string, number>;
  @Output() emitTravelChanges: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickRemove: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeAllCost: EventEmitter<number> = new EventEmitter<number>();
  @Input() travelRates: Map<string, [number, number]>;
  @Input() euro: number;
  @Input() dolar: number;
  ifSoldOut: boolean;
  ifMaxPlaces: boolean;
  lastPlaces: boolean;
  currPrice: string;

  constructor(private app: CardListComponent) {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.ifSoldOut = (this.places == 0);
    this.ifMaxPlaces = (this.places == this.travel.places);
    this.lastPlaces = (this.places <= 3);
    this.getPriceCorectCurency();
  }

  clickedChangePlaces(x: number): void {
    if (x == 1) {
      if (!this.ifMaxPlaces) {
        this.places += x;
        this.emitTravelChanges.emit(-x);
        this.changeAllCost.emit(this.travel.price * -x)
      }
    } else {
      if (!this.ifSoldOut) {
        this.places += x;
        this.emitTravelChanges.emit(-x);
        this.changeAllCost.emit(this.travel.price * -x)
      }
    }
    this.ifSoldOut = (this.places == 0);
    this.ifMaxPlaces = (this.places == this.travel.places);
    this.lastPlaces = (this.places <= 3);
    this.chosenTravels.set(this.travel.name, this.travel.places - this.places);

  }

  getShadowColor(): string {
    if (this.travel.price == this.highPrice) {
      return "8px 8px 24px 0px #00ff00";
    } else if (this.travel.price == this.lowPrice) {
      return "8px 8px 24px 0px red";
    }
    return "8px 8px 24px 0px white";
  }

  clickedRemove(): void {
    this.clickRemove.emit(this.idx)
  }

  getPriceCorectCurency() {
    let currPrice: number;
    let newCurrency: string;
    switch (this.currency) {
      case 1: {
        currPrice = Math.round(this.travel.price * this.euro * 100) / 100;
        newCurrency = "€";
        break;
      }
      case 2: {
        currPrice = Math.round(this.travel.price * this.dolar * 100) / 100;
        newCurrency = "$";
        break;
      } default: {
        currPrice = Math.round(this.travel.price * 100) / 100;
        newCurrency = "PLN";
        break;
      }
    }
    this.currPrice = currPrice + ' ' + newCurrency;
  }

}
