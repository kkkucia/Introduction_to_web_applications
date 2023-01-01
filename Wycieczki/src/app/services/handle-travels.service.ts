import { Injectable, OnInit} from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { Observable, Subject, Subscription } from 'rxjs';
import { FilterRangesService } from './filter-ranges.service';
import { FirebaseDataService } from './firebase-data.service';

@Injectable({
  providedIn: 'root'
})
export class HandleTravelsService implements  OnInit{

  private travelsAll: ITravel[];
  idx: number = 0;
  t: any;
  travelSub: Subscription | undefined;

  private travels: Subject<ITravel[]> = new Subject<ITravel[]>;

  constructor(private filterService: FilterRangesService, private db: FirebaseDataService) { }

  ngOnInit(): void {
   this.travelSub = this.db.getTravels().subscribe((change:any) => {
      let t = []
      for (let travel of change){
        t.push({
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
        } as ITravel)
        this.idx += 1;
      }
      this.travelsAll = t;
    })
  }

  removeCardFromTravels(travel: ITravel): void {
    for (let i in this.travelsAll) {
      if (travel == this.travelsAll[Number(i)]) {
        this.travelsAll.splice(Number(i), 1);
        this.db.delateTravel(travel);
      }
    }
    this.travels.next(this.travelsAll);
  }

  addCardToTravels(card: ITravel): void {
    this.travelsAll.push(card);
    this.db.addTravel(card);
    this.filterService.checkPrices(this.travelsAll);
    this.filterService.setravelRanges(this.travelsAll);
    this.travels.next(this.travelsAll);
  }

  changeTravelAvaiablePlaces(travel: ITravel, tickets: number) {
    let p: number = travel.places;
    for (let t of this.travelsAll) {
      if (t == travel) {
        p = t.places - tickets;
        t.places = p;
        break;
      }
    }
    this.db.changePlaces(travel, p)
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

  changeTravelPlacesNumber(travel: ITravel, newPlaces: number){
    for (let t of this.travelsAll) {
      if (t == travel) {
        t.places = newPlaces;
        break;
      }
    }
    this.db.changePlaces(travel, newPlaces)
    this.travels.next(this.travelsAll);
  }

}
