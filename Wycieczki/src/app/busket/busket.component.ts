import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.scss']
})
export class BusketComponent {

  @Input() travelCounter: number;
  @Input() currency: number;
  @Input() chosenTravels: Map<string,  number>;
  @Input() allCost: number;
  currAllCost: number;
  busketOn: boolean = false;

  showAndHideBusket():void{
      this.busketOn = !this.busketOn;
  }

}
