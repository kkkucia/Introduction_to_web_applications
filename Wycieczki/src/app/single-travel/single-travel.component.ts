import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITravel } from '../interfaces/travel';
import { AuthenticationService } from '../services/authentication.service';
import { BusketHandlingService } from '../services/busket-handling.service';
import { FirebaseDataService } from '../services/firebase-data.service';
import { HandleTravelsService } from '../services/handle-travels.service';


@Component({
  selector: 'app-single-travel',
  templateUrl: './single-travel.component.html',
  styleUrls: ['./single-travel.component.scss']
})
export class SingleTravelComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined
  id: number;
  travel: ITravel;
  travelsAll: ITravel[];
  chosenTravels: Map<ITravel, number>;
  currency: number;
  places: number;
  imgCollection: Array<object>;
  travelToRate: any;

  constructor(private route: ActivatedRoute, private handligTravelService: HandleTravelsService, private busketHandleService: BusketHandlingService, public auth: AuthenticationService, public db: FirebaseDataService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(parameter => {
      this.id = parameter['id'];
    })

    this.travelsAll = this.handligTravelService.returnTravels();
    this.travel = this.travelsAll.filter((t) => t.id == this.id)[0];
    this.places = this.busketHandleService.getLostPlaces(this.travel);

    this.busketHandleService.getChosedTravelsList().subscribe(chosedTravelsList => {
      this.chosenTravels = chosedTravelsList;
      this.places = this.busketHandleService.getLostPlaces(this.travel);
    });

    this.handligTravelService.getTravels().subscribe(travels => {
      this.travelsAll = travels;
    });

    this.busketHandleService.getActualCurrency().subscribe(newCurrency => {
      this.currency = newCurrency;
    });

    this.currency = this.busketHandleService.getBusket().currency;

    this.prepareImgCollection();

    this.db.getTravels().subscribe(items => {
      for(let i of items){
        if (this.travel.name == i.name && this.travel.country == i.country && this.travel.description == i.description){
          this.travelToRate = i;
        }
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

  prepareImgCollection(){
    this.imgCollection = new Array<object>;
    let obj = {
        image: this.travel.image,
        thumbImage: this.travel.image,
        alt: this.travel.country,
        title: this.travel.country
    }
    this.imgCollection.push(obj);
    for (let i = 0; i < 10; i++) {
      this.imgCollection.push(obj);
    }
  }

  
}

