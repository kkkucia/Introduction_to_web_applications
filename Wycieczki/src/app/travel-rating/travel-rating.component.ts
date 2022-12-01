import { Component, Input, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';

@Component({
  selector: 'app-travel-rating',
  templateUrl: './travel-rating.component.html',
  styleUrls: ['./travel-rating.component.scss']
})
export class TravelRatingComponent{
  @Input() travel: ITravel;

  constructor() { }
  
  starClicked(event: any) {
    this.travel.ratingCounter += 1;
    this.travel.ratingSum += Number(event.target.value);
    this.travel.rating = Math.round((this.travel.ratingSum / this.travel.ratingCounter));
  }
}
