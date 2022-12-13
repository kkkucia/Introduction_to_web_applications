import { Component, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { BusketHandlingService } from '../services/busket-handling.service';

import { HistoryHandlingService } from '../services/history-handling.service';

@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.component.html',
  styleUrls: ['./travel-history.component.scss']
})
export class TravelHistoryComponent implements OnInit {

  historyTravels: Map<ITravel, number>;
  currency: number;
  state: string = 'all';

  constructor(private historyHandleService: HistoryHandlingService, private busketHandleService: BusketHandlingService) {

  }
  ngOnInit(): void {
    this.historyHandleService.getTravelsHistoryList().subscribe(history => {
      this.historyTravels = history;
    });
    this.busketHandleService.getActualCurrency().subscribe(newCurrency => {
      this.currency = newCurrency;
    });

    this.takeTravels();
  }

  takeTravels(): void {
    this.historyTravels = this.historyHandleService.giveTravelHistory();
  }
  changeState(state: string) {
    this.state = state;
  }


}

