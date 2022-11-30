import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-travel-rating',
  templateUrl: './travel-rating.component.html',
  styleUrls: ['./travel-rating.component.scss']
})
export class TravelRatingComponent implements OnInit {
  @Input() travelRates: Map<string, [number, number]>;
  @Input() travelName: string;
  rate: number;
  allRates: number;
  counter: number;

  constructor() { }
  ngOnInit(): void {
    this.rate = 0;
    this.allRates = 0;
    this.counter = 0;
    this.travelRates.set(this.travelName, [this.rate, this.counter]);
  }

  starClicked(event: any) {
    this.counter += 1;
    this.allRates += Number(event.target.value);
    this.rate = Math.round((this.allRates / this.counter) * 10) / 10;
    this.travelRates.set(this.travelName, [this.rate, this.counter]);
  }

}
