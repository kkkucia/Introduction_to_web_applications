import { Injectable, OnInit } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { ITravel } from '../interfaces/travel';
import { User } from '../interfaces/user';
import { IOpinion } from '../interfaces/opinion';

@Injectable({
  providedIn: 'root'
})

export class FirebaseDataService implements OnInit {
  
  daneRef: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.daneRef = this.db.list('travels').valueChanges();
  }

  ngOnInit(): void {
    this.daneRef = this.db.list('travels').valueChanges();
  }

  getTravels(): Observable<any[]> {
    this.daneRef = this.db.list('travels').valueChanges();
    return this.daneRef
  }


  addTravel(travel: any) {
    let newTravel: any = {
      "name": travel.name,
      "country": travel.country,
      "startDate": travel.startDate,
      "endDate": travel.endDate,
      "price": travel.price,
      "places": travel.places,
      "description": travel.description,
      "image": travel.image,
      "rate": 0,
      "rateCount": 0,
      "rateSum": 0
    }
    this.db.list('travels').push(newTravel);
  }

  delateTravel(travel: ITravel) {
    this.db.list('travels').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (travel.name == i.payload.val().name && travel.country == i.payload.val().country && travel.description == i.payload.val().description) {
          let key = i.payload.key
          this.db.list('travels').remove(key);
          break;
        }
      }
    })
  }

  changePlaces(travel: ITravel, places: number) {
    this.db.list('travels').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (travel.name == i.payload.val().name && travel.country == i.payload.val().country && travel.description == i.payload.val().description) {
          this.db.list('travels').update(i.payload.key, {places: places})
        }
      }
    })
  }

  changePrice(travel: ITravel, newPrice: number){
    this.db.list('travels').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (travel.name == i.payload.val().name && travel.country == i.payload.val().country && travel.description == i.payload.val().description) {
          this.db.list('travels').update(i.payload.key, {price: newPrice})
        }
      }
    })
  }

  changeRate(travel: any, newRate: number){
    this.db.list('travels').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (travel.name == i.payload.val().name && travel.country == i.payload.val().country && travel.description == i.payload.val().description) {
          this.db.list('travels').update(i.payload.key, {rateCount: i.payload.val().rateCount + 1})
          this.db.list('travels').update(i.payload.key, {rateSum: i.payload.val().rateSum + newRate})
        }
      }
    })
  }

  updateHistoryRated(travel: ITravel, uid: string){
    this.db.list('history').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (travel.name == i.payload.val().name && travel.country == i.payload.val().country && uid == i.payload.val().customer) {
          this.db.list('history').update(i.payload.key, {isRated: true})
        }
      }
    })
  }

  async getUserRoles(uid : string){
    return firstValueFrom(this.db.object('/users/' + uid + '/roles').valueChanges());
  }

  safeNewUser(newUser: User){ 
    this.db.object('/users/' + newUser.uid).set({
      email: newUser.email,
      roles: newUser.roles
    });
  }

  changeUserRole(uid: string, newRole: string, value: string){
    let changes = '{"' + newRole + '"' + ': ' + value + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(changes));
  }

  getUsers(){
    return this.db.list('users').snapshotChanges();
  }

  addToHistory(travel: ITravel, tickets: number, uid: string) {
    let historyTravel: any = {
      "name": travel.name,
      "country": travel.country,
      "startDate": travel.startDate,
      "endDate": travel.endDate,
      "price": travel.price,
      "tickets": tickets,
      "buyDate": travel.buyDate,
      "rate": 0,
      "customer": uid,
      "isRated": false,
    }
    this.db.list('history').push(historyTravel);
  }

  getHistory(){
    return this.db.list('history').snapshotChanges();
  }

  addToOpinions(opinion : IOpinion) {
    this.db.list('comments').push(opinion);
  }

  getComments(){
    return this.db.list('comments').snapshotChanges();
  }

}
