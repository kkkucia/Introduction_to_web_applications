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
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
