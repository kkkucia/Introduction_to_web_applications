import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITravel } from '../interfaces/travel';
import { ITravelRanges } from '../interfaces/travelRanges';

@Injectable({
  providedIn: 'root'
})
export class FilterRangesService {

  private travelRanges: ITravelRanges = {
    countries: new Set<string>,
    startDate: new Date,
    endDate: new Date,
    minPrice: 0,
    maxPrice: 100000,
    ratings: new Set<number>
  }

  private ranges: Subject<ITravelRanges> = new Subject<ITravelRanges>;

  constructor() { }

  setravelRanges(travels: ITravel[]) {
    for (let travel of travels) {
      if (!this.travelRanges.countries.has(travel.country)) {
        this.travelRanges.countries.add(travel.country);
      }
    }
    this.travelRanges.maxPrice = travels.reduce((a, b) => (a.price > b.price) ? a : b).price;
    this.travelRanges.minPrice = travels.reduce((a, b) => (a.price < b.price) ? a : b).price;

    let firstTimeTravel = travels.reduce((a, b) => (new Date(a.startDate) < new Date(b.startDate) ? a : b));
    let lastTimeTravel = travels.reduce((a, b) => (new Date(a.endDate) > new Date(b.endDate) ? a : b));
    this.travelRanges.startDate = new Date(firstTimeTravel.startDate);
    this.travelRanges.endDate = new Date(lastTimeTravel.endDate);

    this.travelRanges.ratings.add(0).add(1).add(2).add(3).add(4).add(5);

    this.ranges.next(this.travelRanges);
  }

  changeMinPrice(price: number): void {
    this.travelRanges.minPrice = Number(price);
    this.ranges.next(this.travelRanges);
  }

  changeMaxPrice(price: number): void {
    this.travelRanges.maxPrice = Number(price);
    this.ranges.next(this.travelRanges);
  }

  changeStartDate(date: Date): void {
    this.travelRanges.startDate = new Date(date);
    this.ranges.next(this.travelRanges);
  }

  changeEndDate(date: Date): void {
    this.travelRanges.endDate = new Date(date);
    this.ranges.next(this.travelRanges);
  }

  changeRates(rate: number, isChecked: boolean): void {
    if (!isChecked && this.travelRanges.ratings.has(rate)) {
      this.travelRanges.ratings.delete(rate);
    }
    else if (isChecked && !this.travelRanges.ratings.has(rate)) {
      this.travelRanges.ratings.add(rate)
    }
    this.ranges.next(this.travelRanges);
  }

  changeCountries(country: string, isChecked: boolean): void {
    if (!isChecked && this.travelRanges.countries.has(country)) {
      this.travelRanges.countries.delete(country);
    }
    else if (isChecked && !this.travelRanges.countries.has(country)) {
      this.travelRanges.countries.add(country);
    }
    this.ranges.next(this.travelRanges);
  }

  getRanges(): Observable<ITravelRanges> {
    return this.ranges.asObservable();
  }
}