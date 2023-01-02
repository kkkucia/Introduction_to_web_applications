import { Component, OnInit } from '@angular/core';
import { BusketHandlingService } from '../services/busket-handling.service';

import { HistoryHandlingService } from '../services/history-handling.service';

@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.component.html',
  styleUrls: ['./travel-history.component.scss']
})
export class TravelHistoryComponent implements OnInit {

  historyTravels : any[] = [];
  currency: number;
  state: string = 'all';

  constructor(private historyHandleService: HistoryHandlingService, private busketHandleService: BusketHandlingService) {

  }
  ngOnInit(): void {
      this.historyTravels = this.historyHandleService.giveTravelHistory();
      

    this.busketHandleService.getActualCurrency().subscribe(newCurrency => {
      this.currency = newCurrency;
    });
  }
  
  changeState(state: string) {
    this.state = state
  }
}

