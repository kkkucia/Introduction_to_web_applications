import { Component, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { ITravelRanges } from '../interfaces/travelRanges';
import { AuthenticationService } from '../services/authentication.service';
import { BusketHandlingService } from '../services/busket-handling.service';
import { FilterRangesService } from '../services/filter-ranges.service';
import { HandleTravelsService } from '../services/handle-travels.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})


export class CardListComponent implements OnInit {
  [x: string]: any
  manage: boolean = false;
  travels: ITravel[] = new Array<ITravel>;
  travelsAll: ITravel[];
  travelRanges: ITravelRanges;
  countryList: Map<string, boolean>;
  currency: number = 0;
  counter: number = 0;
  highPrice: number;
  lowPrice: number;
  chosenTravels: Map<ITravel, number>;
  allCost: number;

  constructor(private filterService: FilterRangesService, private handligTravelService: HandleTravelsService, private busketHandleService: BusketHandlingService, public auth: AuthenticationService) {
  }

  ngOnInit(): void {
    if(this.auth.userRoles.admin == true || this.auth.userRoles.manager == true){
      this.manage = true;
    }
    this.travels = this.handligTravelService.returnTravels()
    this.filterService.checkPrices(this.travels);
    this.lowPrice = this.filterService.givePrices()[0];
    this.highPrice = this.filterService.givePrices()[1];
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
    });

    this.filterService.getHighPrice().subscribe(price => {
      this.highPrice = price;
    });

    this.filterService.getLowPrice().subscribe(price => {
      this.lowPrice = price;
    });

    this.handligTravelService.getTravels().subscribe(travels => {
      this.travelsAll = travels;
    });

    this.busketHandleService.getChosedTravelsList().subscribe(chosedTravelsList => {
      this.chosenTravels = chosedTravelsList;
    });

    this.busketHandleService.getAllcost().subscribe(allCost => {
      this.allCost = allCost;
    });

    this.busketHandleService.getTravelCounter().subscribe(travelCnt => {
      this.counter = travelCnt;
    });

    this.busketHandleService.getActualCurrency().subscribe(curr => {
      this.currency = curr
    });

    this.filterService.getCountryList().subscribe(list => {
      this.countryList = list;
    })
  }

  changeNumberTravels(x: number): void {
    this.busketHandleService.changeTravelNumber(x);
  }

  getBorderColor(): string {
    return this.counter >= 10 ? 'green' : 'red';
  }

  removeCard(travel: ITravel): void {
    this.filterService.delateFromCountryList(travel.country, this.travelsAll);
    this.handligTravelService.removeCardFromTravels(travel);
    this.busketHandleService.removeTravelPlaces(travel)
    this.filterService.checkPrices(this.travelsAll);
  }
}
