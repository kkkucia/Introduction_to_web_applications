import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITravel } from '../interfaces/travel';

@Injectable({
  providedIn: 'root'
})
export class HistoryHandlingService implements OnInit {

  historyTravels: Map<ITravel, number>;
  notification: string;

  private history: Subject<Map<ITravel, number>> = new Subject<Map<ITravel, number>>;
  private travelNofi: Subject<string> = new Subject<string>;

  constructor() { }

  ngOnInit(): void {
    this.historyTravels = new Map<ITravel, number>;
    this.notification = "Brak zbliżających się wycieczek!";
    this.travelNofi.next(this.notification);
  }

  addTravelToHistory(travel: ITravel, tickets: number) {
    this.historyTravels.set(travel, tickets);
    this.history.next(this.historyTravels);
    this.getTheNearestTravel();
  }

  getTravelsHistoryList(): Observable<Map<ITravel, number>> {
    return this.history.asObservable();
  }

  getTravelsNofication(): Observable<string> {
    return this.travelNofi.asObservable();
  }

  giveTravelHistory(): Map<ITravel, number> {
    return this.historyTravels;
  }

  getTheNearestTravel(): void {
    let travels: ITravel[] = [];

    for (let t of this.historyTravels) {
      travels.push(t[0]);
    }
    if (travels.length != 0) {
      let nearest = travels.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
      this.notification = "Najbliższa wycieczka to: " + nearest.name;
    } else {
      this.notification = "Brak zbliżających się wycieczek!";
    }
    this.travelNofi.next(this.notification);
  }
}
