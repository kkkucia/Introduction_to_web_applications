import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITravel } from '../interfaces/travel';
import { BusketHandlingService } from '../services/busket-handling.service';
import { HandleTravelsService } from '../services/handle-travels.service';

import json from '../../assets/imgCollection.json'

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
  imgCollection: Array<object> = json;

  constructor(private route: ActivatedRoute, private handligTravelService: HandleTravelsService, private busketHandleService: BusketHandlingService) {
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
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
}

