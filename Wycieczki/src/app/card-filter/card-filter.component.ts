import { Component, Input, OnInit } from '@angular/core';
import { ITravel } from '../interfaces/travel';
import { FilterRangesService } from '../services/filter-ranges.service';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class CardFilterComponent implements OnInit{
  @Input() travels: ITravel[];
  @Input() highPrice: number;
  @Input() lowPrice: number;
  @Input() countryList: Map<string, boolean>;
  rateList: number[] = [0, 1, 2, 3, 4, 5]
  checkTabRate: boolean[] = [true, true, true, true, true, true]
  constructor(private filterService: FilterRangesService){}

  ngOnInit(): void {

    this.filterService.setravelRanges(this.travels);
  }

  minPriceClicked(e:any){
    this.filterService.changeMinPrice(e.target.value);
  }

  maxPriceClicked(e:any){
    this.filterService.changeMaxPrice(e.target.value);
  }

  startDateClicked(e:any){
    this.filterService.changeStartDate(e.target.value);
  }

  endDateClicked(e:any){
    this.filterService.changeEndDate(e.target.value);
  }

  rateClicked(e:any){
    this.checkTabRate[e.target.value] = !this.checkTabRate[e.target.value];
    this.filterService.changeRates(Number(e.target.value), this.checkTabRate[e.target.value]);
   }

   countryClicked(e:any):void{
    let isChecked = !this.countryList.get(e.target.value);
    this.countryList.set(e.target.value, isChecked);
    this.filterService.changeCountries(e.target.value, isChecked);
   }


}
