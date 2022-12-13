import { Injectable } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { Observable, Subject } from 'rxjs';
import { FilterRangesService } from './filter-ranges.service';

@Injectable({
  providedIn: 'root'
})
export class HandleTravelsService {

  private travelsAll: ITravel[] = [];
  idx: number = 0;

  private travels: Subject<ITravel[]> = new Subject<ITravel[]>;

  constructor(private filterService: FilterRangesService) { }

  createTravels(data: any): void {

    for (let travel of data) {
      this.travelsAll.push({
        id: this.idx,
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
        ratingSum: 0,
        state: 'oferta',
        buyDate: new Date()
      })
      this.idx += 1;
    }
  }

  removeCardFromTravels(travel: ITravel): void {
    for (let i in this.travelsAll) {
      if (travel == this.travelsAll[Number(i)]) {
        this.travelsAll.splice(Number(i), 1);
      }
    }
    this.travels.next(this.travelsAll);
  }

  addCardToTravels(card: ITravel): void {
    this.travelsAll.push(card);
    this.filterService.checkPrices(this.travelsAll);
    this.filterService.setravelRanges(this.travelsAll);
    this.travels.next(this.travelsAll);
  }

  changeTravelAvaiablePlaces(travel: ITravel, tickets: number) {
    for (let t of this.travelsAll) {
      if (t == travel) {
        t.places -= tickets;
      }
    }
    this.travels.next(this.travelsAll);
  }

  getTravels(): Observable<ITravel[]> {
    return this.travels.asObservable();
  }

  returnTravels(): ITravel[] {
    return this.travelsAll
  }

  returnId(): number {
    this.idx += 1
    return this.idx - 1
  }
}
