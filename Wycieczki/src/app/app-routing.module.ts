import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CardAddComponent } from './card-add/card-add.component';
import { BusketComponent } from './busket/busket.component';
import { TravelHistoryComponent } from './travel-history/travel-history.component';
import { SingleTravelComponent } from './single-travel/single-travel.component';


const routes: Routes = [
  { path: ' ', component: MainPageComponent },
  { path: 'mainPage', component: MainPageComponent },
  { path: 'cardList/:id', component: SingleTravelComponent },
  { path: 'cardList', component: CardListComponent },
  { path: 'cardAdd', component: CardAddComponent },
  { path: 'busket', component: BusketComponent },
  { path: 'history', component: TravelHistoryComponent },
  { path: '**', component: MainPageComponent }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
