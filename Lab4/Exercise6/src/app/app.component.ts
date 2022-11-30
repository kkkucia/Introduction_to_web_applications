import { Component } from '@angular/core';
import json from '../assets/topics.json'
import { ICard } from './interfaces/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Exercise6';
  data: ICard[] = json;
  moreInfo: string;


  public addInfo(id:number): void {
    this.moreInfo = this.data[id].moreInfo;
  }
}
