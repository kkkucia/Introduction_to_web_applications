import { Component, Input, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { ITravelRanges } from '../interfaces/travelRanges';
import { FilterRangesService } from '../services/filter-ranges.service';
import { HandleTravelsService } from '../services/handle-travels.service';

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

  constructor(private filterService: FilterRangesService, private handligTravelService: HandleTravelsService) {
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
    this.handligTravelService.giveTravels(this.travels);

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
      this.travelsAll = this.travels.slice();
    });

    this.handligTravelService.getTravels().subscribe(travels => {
      this.travelsAll = travels;
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

  changeCurency(curr: number) {
    this.currency = curr;
  }

  removeCard(travel: ITravel): void {
    let numTravelsofThisCountry = this.travelsAll.filter((t)=> t.country == travel.country).length;
    if (numTravelsofThisCountry < 2){
      this.countryList.delete(travel.country);
    }

    this.handligTravelService.removeCardFromTravels(travel);
    this.checkPrices(this.travelsAll);
  }

  formsEvent(travel: ITravel) {
    this.handligTravelService.addCardToTravels(travel);
    this.filterService.setravelRanges(this.travelsAll);
    this.checkPrices(this.travelsAll);
    if (!this.countryList.has(travel.country)) {
      this.countryList.set(travel.country, true);
    }
  }
}
