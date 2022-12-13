import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { ReservePlaceComponent } from './reserve-place/reserve-place.component';
import { CurrencyChangeComponent } from './currency-change/currency-change.component';
import { CardAddComponent } from './card-add/card-add.component';
import { TravelRatingComponent } from './travel-rating/travel-rating.component';
import { BusketComponent } from './busket/busket.component';
import { CurrencyPipe } from './shared/currency.pipe';
import { CardFilterComponent } from './card-filter/card-filter.component';
import { FilterPipe } from './shared/filter.pipe';
import { FilterRangesService } from './services/filter-ranges.service';
import { HandleTravelsService } from './services/handle-travels.service';
import { BusketHandlingService } from './services/busket-handling.service';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TravelHistoryComponent } from './travel-history/travel-history.component';
import { SingleTravelComponent } from './single-travel/single-travel.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { CommentHandlingService } from './services/comment-handling.service';
import { DatePipe } from '@angular/common';
import { StatePipe } from './shared/state.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    ReservePlaceComponent,
    CurrencyChangeComponent,
    CardAddComponent,
    TravelRatingComponent,
    BusketComponent,
    CurrencyPipe,
    CardFilterComponent,
    FilterPipe,
    NavigationBarComponent,
    MainPageComponent,
    TravelHistoryComponent,
    SingleTravelComponent,
    CommentsSectionComponent,
    StatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgImageSliderModule
  ],
  providers: [DatePipe, FilterRangesService, HandleTravelsService, BusketHandlingService, CommentHandlingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
