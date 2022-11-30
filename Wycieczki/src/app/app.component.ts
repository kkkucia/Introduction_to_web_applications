import { Component } from '@angular/core';
import { ITravel } from './interfaces/travel';
import json from '../assets/travels.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Wycieczki';
  data: ITravel[] = json;
}
