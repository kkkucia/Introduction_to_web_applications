import { Injectable, Input, OnInit } from '@angular/core';
import { IOpinion } from '../interfaces/opinion';
import { ITravel } from '../interfaces/travel';
import { AuthenticationService } from './authentication.service';
import { FirebaseDataService } from './firebase-data.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsHandlingService implements OnInit{
  opinionsAll: IOpinion[] = [];

  constructor(public auth : AuthenticationService, public db: FirebaseDataService) { }

  ngOnInit(): void {
    this.db.getComments().subscribe((items: any) => {
      for(let i of items){
          this.opinionsAll.push(i.payload.val())
      }
    })
  }

  getOpinions(travel: ITravel): IOpinion[]{
    let optionsForSingleTravel : IOpinion[] = [];
    this.db.getComments().subscribe((items: any) => {
      for(let i of items){
        if(travel.name == i.payload.val().name && travel.country == i.payload.val().country){
          optionsForSingleTravel.push(i.payload.val())
        }
      }
    })
    return optionsForSingleTravel;
  }
}
