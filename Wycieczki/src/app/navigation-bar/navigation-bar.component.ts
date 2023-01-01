import { Component, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { AuthenticationService } from '../services/authentication.service';
import { BusketHandlingService } from '../services/busket-handling.service';
import { HistoryHandlingService } from '../services/history-handling.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  counter = 0;
  currency = 0;
  cost = 0;
  nearTravel: string = "Brak zbliżających się wycieczek!"
  historyTravels: Map<ITravel, number>;

  constructor(private busketHandleService: BusketHandlingService, private historyTravelService: HistoryHandlingService, public auth: AuthenticationService) { }

  ngOnInit(): void {
  
    this.busketHandleService.getTravelCounter().subscribe(travelCnt => {
      this.counter = travelCnt;
    });

    this.busketHandleService.getAllcost().subscribe(cost => {
      this.cost = cost;
    });

    this.busketHandleService.getActualCurrency().subscribe(currency => {
      this.currency = currency;
    });

    this.historyTravelService.getTravelsNofication().subscribe(nofi => {
      this.nearTravel = nofi;
    });
  }
}


