import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ITravel } from '../interfaces/travel';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})


export class CardListComponent implements OnInit {

  @Input() data: ITravel[];
  currency: number = 0;
  counter: number = 0;
  highPrice: number;
  lowPrice: number;
  travelRates: Map<string, [number, number]> = new Map<string, [number, number]>();
  chosenTravels: Map<string,  number> = new Map<string, number>();
  allCost: number = 0;

  constructor(private app: AppComponent) {

  }

  ngOnInit(): void {
    this.checkPrices(this.data);
  }

  changeNumberTravels(x: number): void {
    this.counter += x;

    console.log(this.data);
  }

  changeAllCost(cost: number){
    this.allCost += cost;
  }

  getBorderColor(): string {
    return this.counter >= 10 ? 'green' : 'red';
  }

  checkPrices(data: ITravel[]) {
    this.highPrice = Number.NEGATIVE_INFINITY;
    this.lowPrice = Number.POSITIVE_INFINITY;
    for (var i in data) {
      this.highPrice = Math.max(this.highPrice, data[i].price);
      this.lowPrice = Math.min(this.lowPrice, data[i].price);
    }
  }

  removeCard(idx: number): void {
    this.data.splice(idx, 1);
    this.checkPrices(this.data);
  }

  changeCurency(curr: number) {
    this.currency = curr;
  }

  formsEvent(travel: ITravel) {
    this.data.push(travel);
    this.checkPrices(this.data);
  }
}
