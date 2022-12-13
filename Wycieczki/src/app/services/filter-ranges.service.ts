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
  countryList: Map<string, boolean> = new Map<string, boolean>();
   highPrice = Number.NEGATIVE_INFINITY;
   lowPrice = Number.POSITIVE_INFINITY;

  private ranges: Subject<ITravelRanges> = new Subject<ITravelRanges>;

  private bigPrice: Subject<number> = new Subject<number>;
  private smallPrice: Subject<number> = new Subject<number>;
  private countriesList: Subject<Map<string, boolean>> = new Subject<Map<string, boolean>>;

  constructor() { }

  setravelRanges(travels: ITravel[]) {
    for (let travel of travels) {
      if (!this.travelRanges.countries.has(travel.country)) {
        this.travelRanges.countries.add(travel.country);
      }
      if (!this.countryList.has(travel.country)) {
        this.countryList.set(travel.country, true);
      }
    }
    this.countriesList.next(this.countryList);

    this.travelRanges.maxPrice = travels.reduce((a, b) => (a.price > b.price) ? a : b).price;
    this.travelRanges.minPrice = travels.reduce((a, b) => (a.price < b.price) ? a : b).price;

    let firstTimeTravel = travels.reduce((a, b) => (new Date(a.startDate) < new Date(b.startDate) ? a : b));
    let lastTimeTravel = travels.reduce((a, b) => (new Date(a.endDate) > new Date(b.endDate) ? a : b));
    this.travelRanges.startDate = new Date(firstTimeTravel.startDate);
    this.travelRanges.endDate = new Date(lastTimeTravel.endDate);

    this.travelRanges.ratings.add(0).add(1).add(2).add(3).add(4).add(5);

    this.ranges.next(this.travelRanges);
  }

  checkPrices(travels: ITravel[]) {
    this.highPrice = Number.NEGATIVE_INFINITY;
    this.lowPrice = Number.POSITIVE_INFINITY;
    for (var i in travels) {
      this.highPrice = Math.max(this.highPrice, travels[i].price);
      this.lowPrice = Math.min(this.lowPrice, travels[i].price);
    }
    this.bigPrice.next(this.highPrice);
    this.smallPrice.next(this.lowPrice);
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

  delateFromCountryList(country: string, travelsAll :ITravel[]){
    let numTravelsofThisCountry = travelsAll.filter((t)=> t.country == country).length;
    if (numTravelsofThisCountry < 2){
      this.countryList.delete(country);
    }
    this.countriesList.next(this.countryList);
  }

  addToCountryList(country:string){
    if (!this.countryList.has(country)) {
      this.countryList.set(country, true);
    }
    this.countriesList.next(this.countryList);
  }

  getCountryList(): Observable<Map<string, boolean>> {
    return this.countriesList.asObservable();
  }

  returnCountryList(): Map<string, boolean> {
    return this.countryList;
  }

  getRanges(): Observable<ITravelRanges> {
    return this.ranges.asObservable();
  }

  getHighPrice(): Observable<number> {
    return this.bigPrice.asObservable();
  }

  getLowPrice(): Observable<number> {
    return this.smallPrice.asObservable();
  }

  givePrices(): number[]{
    return [this.lowPrice, this.highPrice];
  }

}