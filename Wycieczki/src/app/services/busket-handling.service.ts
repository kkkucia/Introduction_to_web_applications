import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { IBusket } from '../interfaces/busket';
import { ITravel } from '../interfaces/travel';

@Injectable({
  providedIn: 'root'
})
export class BusketHandlingService implements OnInit {

  private chosenTravels: Map<ITravel, number>;
  private allCost: number;
  private travelCounter: number;
  private currency: number;
  busket: IBusket;

  private chosedTravelsList: Subject<Map<ITravel, number>> = new Subject<Map<ITravel, number>>;
  private allCostAdded: Subject<number> = new Subject<number>;
  private travelCounterNumber: Subject<number> = new Subject<number>;
  private actualCurrency: Subject<number> = new Subject<number>;

  ngOnInit(): void {
    this.allCost = 0;
    this.travelCounter = 0;
    this.currency = 0;
    this.chosenTravels = new Map<ITravel, number>;
    this.allCostAdded.next(this.allCost);
    this.chosedTravelsList.next(this.chosenTravels);
  }

  addReservedPlace(travel: ITravel) {
    if (this.chosenTravels.has(travel)) {
      let places = this.chosenTravels.get(travel);
      if (places != undefined) {
        this.chosenTravels.set(travel, places + 1);
      }
    }
    else {
      this.chosenTravels.set(travel, 1)
    }
    this.allCost += travel.price;
    this.travelCounter += 1;

    this.allCostAdded.next(this.allCost);
    this.chosedTravelsList.next(this.chosenTravels);
    this.travelCounterNumber.next(this.travelCounter);
  }

  removeReservedPlace(travel: ITravel) {
    if (this.chosenTravels.has(travel)) {
      let places = this.chosenTravels.get(travel);
      if (places != undefined) {
        this.chosenTravels.set(travel, places - 1);
        this.allCost -= travel.price;
        this.travelCounter -= 1;
      }
    }
    this.allCostAdded.next(this.allCost);
    this.chosedTravelsList.next(this.chosenTravels);
    this.travelCounterNumber.next(this.travelCounter);
  }

  changeTravelNumber(num: number): void {
    this.travelCounter += num;
    this.travelCounterNumber.next(this.travelCounter);
  }

  removeTravelPlaces(travel: ITravel) {
    let places = this.chosenTravels.get(travel);
    if (places != undefined) {
      this.allCost -= travel.price * places;
      this.chosenTravels.delete(travel);
      this.allCostAdded.next(this.allCost);
      this.chosedTravelsList.next(this.chosenTravels);
    }
  }

  changeCurency(curr: number) {
    this.currency = curr;
    this.actualCurrency.next(this.currency);
  }

  getBusket(): IBusket {
    this.busket = {
      "allCost": this.allCost,
      "chosenTravels": this.chosenTravels,
      "travelCounter": this.travelCounter,
      "currency": this.currency
    }
    return this.busket
  }

  getAcctualPlaces(travel: ITravel): any {
    if (this.chosenTravels.has(travel)) {
      return this.chosenTravels.get(travel);
    } else {
      return 0;
    }
  }

  getLostPlaces(travel: ITravel): any {
    if (this.chosenTravels.has(travel)) {
      let p = this.chosenTravels.get(travel)
      if (p != undefined) {
        return travel.places - p;
      }
    } else {
      return travel.places;
    }
  }

  getTravelCounter(): Observable<number> {
    return this.travelCounterNumber.asObservable();
  }

  getActualCurrency(): Observable<number> {
    return this.actualCurrency.asObservable();
  }

  getChosedTravelsList(): Observable<Map<ITravel, number>> {
    return this.chosedTravelsList.asObservable();
  }

  getAllcost(): Observable<number> {
    return this.allCostAdded.asObservable();
  }
}
