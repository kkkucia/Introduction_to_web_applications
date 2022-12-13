import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { BusketHandlingService } from '../services/busket-handling.service';
import { FilterRangesService } from '../services/filter-ranges.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() travel: ITravel;
  places: number;
  @Input() color: string;
  highPrice: number;
  lowPrice: number;
  currency: number = 0;
  @Output() emitTravelChanges: EventEmitter<number> = new EventEmitter<number>();
  @Output() clickRemove: EventEmitter<ITravel> = new EventEmitter<ITravel>();
  chosenTravels: Map<ITravel, number>;
  ifSoldOut: boolean;
  ifMaxPlaces: boolean;
  lastPlaces: boolean;
  allCost: number;

  constructor(private busketHandleService: BusketHandlingService, private filterService: FilterRangesService) {}
  ngOnInit(): void {
    this.places = this.travel.places;
    this.busketHandleService.getChosedTravelsList().subscribe(chosedTravelsList => {
      this.chosenTravels = chosedTravelsList;
      this.places = this.busketHandleService.getLostPlaces(this.travel);
    });
    this.busketHandleService.getAllcost().subscribe(allCost => {
      this.allCost = allCost;
    });
    this.busketHandleService.getActualCurrency().subscribe(newCurrency => {
      this.currency = newCurrency;
    });
    this.filterService.getHighPrice().subscribe(price => {
      this.highPrice = price;
    });

    this.filterService.getLowPrice().subscribe(price => {
      this.lowPrice = price;
    });

    this.lowPrice = this.filterService.givePrices()[0];
    this.highPrice = this.filterService.givePrices()[1];
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
