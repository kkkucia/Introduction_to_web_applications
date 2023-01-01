import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseDataService } from '../services/firebase-data.service';
import { HistoryHandlingService } from '../services/history-handling.service';

@Component({
  selector: 'app-travel-rating',
  templateUrl: './travel-rating.component.html',
  styleUrls: ['./travel-rating.component.scss']
})
export class TravelRatingComponent implements OnInit{
  @Input() travelToRate: any;
  canBeRated: boolean = false;
  rate: number;

  constructor(public db: FirebaseDataService, public auth: AuthenticationService,  private historyHandlingService: HistoryHandlingService) {
  }

  ngOnInit(): void {
    this.checkIfCanBeRated();
  }

  checkIfCanBeRated(){
    if(this.auth.userRoles.manager == true || this.auth.userRoles.admin == true || this.auth.userRoles.banned == true){
      this.canBeRated = false;
    }else{
      this.db.getHistory().subscribe((items: any)=> {
        for (let i of items) {
            if (this.travelToRate.name == i.payload.val().name && this.travelToRate.country == i.payload.val().country && this.auth.userData.uid == i.payload.val().customer) {
              console.log(i.payload.val().isRated)
              if(i.payload.val().isRated == false){
                this.canBeRated =  true;
              }else{
                this.canBeRated =  false;
              }
              break;
          }
        }
        })
    }
  }

  starClicked(event: any) {
    this.db.changeRate(this.travelToRate, Number(event.target.value))
    this.db.updateHistoryRated(this.travelToRate, this.auth.userData.uid)
  }
}
