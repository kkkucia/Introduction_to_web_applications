import { Injectable, OnInit } from '@angular/core';
import { first, Observable, Subject } from 'rxjs';
import { ITravel } from '../interfaces/travel';
import { AuthenticationService } from './authentication.service';
import { FirebaseDataService } from './firebase-data.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryHandlingService implements OnInit {

  historyTravels: any[] = [];
  notification: string;
  private travelNofi: Subject<string> = new Subject<string>;

  constructor(private db: FirebaseDataService, public auth : AuthenticationService) { }

  ngOnInit(): void {
    this.db.getHistory().subscribe((items: any) => {
      for(let i of items){
        if(i.payload.val().customer == String(this.auth.userData.uid)){
          this.historyTravels.push(i.payload.val())
        }
      }
    })

    this.notification = "Brak zbliżających się wycieczek!";
    this.travelNofi.next(this.notification);
  }

  addTravelToHistory(travel: ITravel, tickets: number) {
    this.db.addToHistory(travel, tickets, this.auth.userData.uid)
    this.getTheNearestTravel();
  }

  getTheNearestTravel(): void {
      let future = this.historyTravels.filter((t) => new Date(t.endDate) >= new Date());
      if (future.length != 0) {
      let nearest = future.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
      this.notification = "Najbliższa wycieczka to: " + nearest.name;
    } else {
      this.notification = "Brak zbliżających się wycieczek!";
    }
    this.travelNofi.next(this.notification);
  }

  giveTravelHistory(): any[] {
    let history: any[] = [];
    this.db.getHistory().subscribe((items: any) => {
      for(let i of items){
        if(i.payload.val().customer == String(this.auth.userData.uid)){
          history.push(i.payload.val())
        }
      }
    })
    return history;
  }
  
  getTravelsNofication(): Observable<string> {
    return this.travelNofi.asObservable();
  }

}
