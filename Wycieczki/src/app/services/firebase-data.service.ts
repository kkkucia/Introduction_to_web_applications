import { Injectable, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { ITravel } from '../interfaces/travel';

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

  getTravelsRef(): Observable<any[]> {
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
      "image": travel.image
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
}
