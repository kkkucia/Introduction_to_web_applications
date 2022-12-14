import { Component, OnInit } from '@angular/core';
import { BusketHandlingService } from './services/busket-handling.service';
import { HandleTravelsService } from './services/handle-travels.service';
import { CommentHandlingService } from './services/comment-handling.service';
import { HistoryHandlingService } from './services/history-handling.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private busketHandleService: BusketHandlingService, private travelHandling: HandleTravelsService, private commentHandlingService: CommentHandlingService, private historyService: HistoryHandlingService) { }
  ngOnInit(): void {
    this.busketHandleService.ngOnInit();
    this.commentHandlingService.ngOnInit();
    this.historyService.ngOnInit();
    this.travelHandling.ngOnInit();
  }
}
