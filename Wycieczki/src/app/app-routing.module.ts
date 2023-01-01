import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CardAddComponent } from './card-add/card-add.component';
import { BusketComponent } from './busket/busket.component';
import { TravelHistoryComponent } from './travel-history/travel-history.component';
import { SingleTravelComponent } from './single-travel/single-travel.component';
import { AuthGuard } from './guards/guard/auth.guard';
import { ManagerGuard } from './guards/guard/manager.guard';
import { AdminGuard } from './guards/guard/admin.guard';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminViewComponent } from './admin-view/admin-view.component';


const routes: Routes = [
  { path: 'mainPage', component: MainPageComponent },
  {path: 'registracion', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  { path: 'cardList/:id', component: SingleTravelComponent, canActivate: [AuthGuard] },
  { path: 'cardList', component: CardListComponent },
  { path: 'adminViewCardList', component: CardAddComponent, canActivate: [AdminGuard]},
  { path: 'busket', component: BusketComponent, canActivate: [AuthGuard] },
  { path: 'history', component: TravelHistoryComponent, canActivate: [AuthGuard] },
  {path: 'adminView', component: AdminViewComponent, canActivate:[AdminGuard]},
  {path: 'managerView', component: CardAddComponent, canActivate:[ManagerGuard]},
  { path: 'history', component: TravelHistoryComponent, canActivate: [AuthGuard]},
  { path: ' ', component: MainPageComponent },
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
