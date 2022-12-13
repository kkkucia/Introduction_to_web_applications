import { Pipe, PipeTransform } from '@angular/core';
import { ITravel } from '../interfaces/travel';

@Pipe({
  name: 'state',
  pure: false
})
export class StatePipe implements PipeTransform {

  travelsToReturn: ITravel[];
  travels: ITravel[]

  transform(historyOfTravels: Map<ITravel, number>, state: string): Map<ITravel, number> {

    let currDate = new Date();
    this.travels = [];
    for (let t of historyOfTravels) {
      this.travels.push(t[0]);
    }

    switch (state) {
      case 'before': {
        this.travelsToReturn = this.travels.filter((t) => new Date(t.startDate) > currDate);
        break;
      }
      case 'now': {
        this.travelsToReturn = this.travels.filter((t) => new Date(t.startDate) <= currDate && new Date(t.endDate) >= currDate);
        break;
      }
      case 'after': {
        this.travelsToReturn = this.travels.filter((t) => new Date(t.endDate) < currDate);
        break;
      }
      default: {
        this.travelsToReturn = this.travels
        break;
      }
    }

    let newHistoy: Map<ITravel, number> = new Map<ITravel, number>;

    for (let t of this.travelsToReturn) {
      let ticket = historyOfTravels.get(t);
      if (ticket != undefined) {
        newHistoy.set(t, ticket);
      }
    }

    return newHistoy;
  }

}
