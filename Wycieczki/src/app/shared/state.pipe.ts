import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
  pure: false
})
export class StatePipe implements PipeTransform {
  
  travelsToReturn: any[];
  
  transform(history: any[], state: string):any[]{
    let currDate = new Date();
    
    switch (state) {
      case 'before': {
        this.travelsToReturn = history.filter((t) => new Date(t.startDate) > currDate);
        break;
      }
      case 'now': {
        this.travelsToReturn = history.filter((t) => new Date(t.startDate) <= currDate && new Date(t.endDate) >= currDate);
        break;
      }
      case 'after': {
        this.travelsToReturn = history.filter((t) => new Date(t.endDate) < currDate);
        break;
      }
      default: {
        this.travelsToReturn = history;
        break;
      }
    }
    return this.travelsToReturn;
  }
}
