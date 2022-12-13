import { Component, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { BusketHandlingService } from '../services/busket-handling.service';
import { HandleTravelsService } from '../services/handle-travels.service';
import { HistoryHandlingService } from '../services/history-handling.service';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.scss']
})
export class BusketComponent implements OnInit {

  travelCounter: number;
  currency: number;
  chosenTravels: Map<ITravel, number>;
  allCost: number = 0;

  constructor(private busketHandleService: BusketHandlingService, private historyService: HistoryHandlingService, private travelHandlingService: HandleTravelsService) {

  }
  ngOnInit(): void {
    this.busketHandleService.getChosedTravelsList().subscribe(chosedTravelsList => {
      this.chosenTravels = chosedTravelsList;
    });

    this.busketHandleService.getAllcost().subscribe(allCost => {
      this.allCost = allCost;
    });

    this.busketHandleService.getTravelCounter().subscribe(travelCnt => {
      this.travelCounter = travelCnt;
    });

    this.busketHandleService.getActualCurrency().subscribe(newCurrency => {
      this.currency = newCurrency;
    });
    this.takeBusket();
  }

  takeBusket(): void {
    let busket = this.busketHandleService.getBusket();
    this.travelCounter = busket.travelCounter;
    this.currency = busket.currency;
    this.chosenTravels = busket.chosenTravels;
    this.allCost = busket.allCost;
  }

  buyTravel(travel: ITravel, tickets: number) {
    this.busketHandleService.removeTravelPlaces(travel);
    travel.state = 'kupiona';
    travel.buyDate = new Date();
    this.historyService.addTravelToHistory(travel, tickets)
    this.busketHandleService.changeTravelNumber(-tickets);
    this.travelHandlingService.changeTravelAvaiablePlaces(travel, tickets)
  }

}
