import { Pipe, PipeTransform } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { ITravelRanges } from '../interfaces/travelRanges';


@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  filteredTravels: ITravel[];

  transform(travels: ITravel[], travelRanges: ITravelRanges): ITravel[] {
    let filterCountries = travels.filter((t) => travelRanges.countries.has(t.country));
    let filterRatings = filterCountries.filter((t) => travelRanges.ratings.has(t.rating));
    let filterStartData = filterRatings.filter((t) => new Date(t.startDate) >= travelRanges.startDate);
    let filterEndData = filterStartData.filter((t) => new Date(t.endDate) <= travelRanges.endDate);
    let filterMinPrice = filterEndData.filter((t) => t.price >= travelRanges.minPrice);
    this.filteredTravels = filterMinPrice.filter((t) => t.price <= travelRanges.maxPrice);
    return this.filteredTravels;
  }

}
