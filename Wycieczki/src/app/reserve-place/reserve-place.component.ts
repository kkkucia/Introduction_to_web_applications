import { Component, Input, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { BusketHandlingService } from '../services/busket-handling.service';

@Component({
  selector: 'app-reserve-place',
  templateUrl: './reserve-place.component.html',
  styleUrls: ['./reserve-place.component.scss']
})


export class ReservePlaceComponent implements OnInit {

  @Input() travel: ITravel;
  maxPlaces: number;
  places: number;
  ifMaxPlaces: boolean;
  ifSoldOut: boolean;
  lastPlaces: boolean;

  constructor(private busketHandleService: BusketHandlingService) {

  }
  ngOnInit(): void {
    this.maxPlaces = this.travel.places;
    this.places = this.maxPlaces - this.busketHandleService.getAcctualPlaces(this.travel)

    this.checkPlaces()
  }

  addTravel(): void {
    if (!this.ifSoldOut) {
      this.busketHandleService.addReservedPlace(this.travel);
      this.places = this.maxPlaces - this.busketHandleService.getAcctualPlaces(this.travel)
    }
    this.checkPlaces()
  }

  removeTravel(): void {
    if (!this.ifMaxPlaces) {
      this.busketHandleService.removeReservedPlace(this.travel);
      this.places = this.maxPlaces - this.busketHandleService.getAcctualPlaces(this.travel)
    }
    this.checkPlaces()
  }

  checkPlaces() {
    this.ifSoldOut = (this.places == 0);
    this.ifMaxPlaces = (this.places == this.travel.places);
    this.lastPlaces = (this.places <= 3);
  }
}
