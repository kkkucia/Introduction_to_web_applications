import { Component, Input, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { ITravelRanges } from '../interfaces/travelRanges';
import { FilterRangesService } from '../services/filter-ranges.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})


export class CardListComponent implements OnInit {

  @Input() data: any[];
  travels: ITravel[] = new Array<ITravel>;
  travelsAll: ITravel[];
  addtravelsAll: ITravel[];
  travelRanges: ITravelRanges;
  countryList: Map<string, boolean> = new Map<string, boolean>();
  currency: number = 0;
  counter: number = 0;
  highPrice: number;
  lowPrice: number;
  chosenTravels: Map<string, number> = new Map<string, number>();
  allCost: number = 0;

  constructor(private filterService: FilterRangesService) {
  }

  ngOnInit(): void {
    for (let travel of this.data) {
      this.travels.push({
        name: travel.name,
        country: travel.country,
        startDate: travel.startDate,
        endDate: travel.endDate,
        price: travel.price,
        places: travel.places,
        description: travel.description,
        image: travel.image,
        rating: 0,
        ratingCounter: 0,
        ratingSum: 0
      })
      if (!this.countryList.has(travel.country)) {
        this.countryList.set(travel.country, true);
      }
    }
    this.checkPrices(this.travels);
    this.travelsAll = this.travels.slice();

    this.travelRanges = {
      countries: new Set<string>,
      startDate: new Date,
      endDate: new Date,
      minPrice: this.lowPrice,
      maxPrice: this.highPrice,
      ratings: new Set<number>
    }

    this.filterService.getRanges().subscribe(ranges => {
      this.travelRanges = ranges;
      this.travelsAll = this.travels.slice()
    });
  }


  changeNumberTravels(x: number): void {
    this.counter += x;
  }

  changeAllCost(cost: number) {
    this.allCost += cost;
  }

  getBorderColor(): string {
    return this.counter >= 10 ? 'green' : 'red';
  }

  checkPrices(travels: ITravel[]) {
    this.highPrice = Number.NEGATIVE_INFINITY;
    this.lowPrice = Number.POSITIVE_INFINITY;
    for (var i in travels) {
      this.highPrice = Math.max(this.highPrice, travels[i].price);
      this.lowPrice = Math.min(this.lowPrice, travels[i].price);
    }
  }

  removeCard(idx: number): void {
    this.addtravelsAll = this.travelsAll.slice()
    this.addtravelsAll.splice(idx, 1);
    this.travelsAll = this.addtravelsAll.slice()
    this.checkPrices(this.travelsAll);
  }

  changeCurency(curr: number) {
    this.currency = curr;
  }

  formsEvent(travel: ITravel) {
    this.addtravelsAll = this.travelsAll.slice()
    this.addtravelsAll.push(travel);
    this.travelsAll = this.addtravelsAll.slice()
    this.checkPrices(this.travelsAll);
    if (!this.countryList.has(travel.country)) {
      this.countryList.set(travel.country, true);
    }
    this.filterService.setravelRanges(this.travelsAll);
  }
}
