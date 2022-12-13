; import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITravel } from '../interfaces/travel';
import { FilterRangesService } from '../services/filter-ranges.service';
import { HandleTravelsService } from '../services/handle-travels.service';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  modelForm: FormGroup;
  error: boolean = false;
  dateError: boolean = false;
  correct: boolean = false;

  constructor(private formBuilder: FormBuilder, private handligTravelService: HandleTravelsService, private filterService: FilterRangesService) { }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', [Validators.required, Validators.pattern('([A-ZĄĆĘŁŃÓŚŻŹ]?[a-ząćęłńóśżź]+[ ]?)+'), Validators.minLength(4)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('([1-9]{1}[0-9]+)|([1-9]{1}[0-9]+[,][[0-9]{1,2}])')]],
      places: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      description: ['', Validators.required],
      image: ['../assets/images/deafult.jpg', Validators.required]
    });
  }

  onSubmit(data: any): void {
    this.error = false;
    this.correct = false;
    this.dateError = false;

    if (!data.valid) {
      this.error = true;
      return
    }

    let newTravel: ITravel = {
      id: this.handligTravelService.returnId(),
      name: data.get("name").value,
      country: data.get("country").value,
      startDate: data.get("startDate").value,
      endDate: data.get("endDate").value,
      price: data.get("price").value,
      places: data.get("places").value,
      description: data.get("description").value,
      image: data.get("image").value,
      rating: 0,
      ratingCounter: 0,
      ratingSum: 0,
      state: 'oferta',
      buyDate: new Date(),
    }

    if (newTravel.startDate > newTravel.endDate) {
      this.dateError = true;
      return;
    }

    this.addTravelToList(newTravel);
    this.correct = true;
    data.reset();

  }
  addTravelToList(travel: ITravel) {
    this.handligTravelService.addCardToTravels(travel);
    this.filterService.addToCountryList(travel.country);
  }

}

