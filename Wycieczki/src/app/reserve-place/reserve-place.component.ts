import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-reserve-place',
  templateUrl: './reserve-place.component.html',
  styleUrls: ['./reserve-place.component.scss']
})


export class ReservePlaceComponent {

  @Output() changePlaces: EventEmitter<number> = new EventEmitter<number>();
  @Input() maxPlaces: number;
  @Input() ifMaxPlaces: boolean;
  @Input() ifSoldOut: boolean;

  constructor(private card: CardComponent) {

  }

  addTravel(): void {
    this.changePlaces.emit(-1);
  }

  removeTravel(): void {
    this.changePlaces.emit(1);

  }
}
