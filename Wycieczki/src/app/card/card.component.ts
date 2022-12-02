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
  @Input() highPrice: number;
  @Input() lowPrice: number;
  @Input() currency: number;
  @Input() chosenTravels: Map<string, number>;
  @Output() emitTravelChanges: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickRemove: EventEmitter<ITravel> = new EventEmitter<ITravel>();
  @Output() changeAllCost: EventEmitter<number> = new EventEmitter<number>();
  ifSoldOut: boolean;
  ifMaxPlaces: boolean;
  lastPlaces: boolean;

  constructor(private app: CardListComponent) {

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.ifSoldOut = (this.places == 0);
    this.ifMaxPlaces = (this.places == this.travel.places);
    this.lastPlaces = (this.places <= 3);
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
    this.clickRemove.emit(this.travel)
  }


}
