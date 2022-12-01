import { Injectable } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleTravelsService {

  private travelsAll: ITravel[];

  private travels: Subject<ITravel[]> = new Subject<ITravel[]>;

  constructor() { }

  giveTravels(travelsFromList: any):void{
    this.travelsAll = travelsFromList;
    this.travels.next(this.travelsAll);
  }

  removeCardFromTravels(idx: number):void{
    this.travelsAll.splice(idx, 1);
    this.travels.next(this.travelsAll); 
  }

  addCardToTravels(card: ITravel):void{
    this.travelsAll.push(card);
    this.travels.next(this.travelsAll); 
  }

  getTravels(): Observable<ITravel[]> {
    return this.travels.asObservable();
  }
}
