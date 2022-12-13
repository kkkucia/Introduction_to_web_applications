import { I18nPluralPipe } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOpinion } from '../interfaces/opinion';

@Injectable({
  providedIn: 'root'
})
export class CommentHandlingService implements OnInit {

  opinions: IOpinion[];

  private opinionGetter: Subject<IOpinion[]> = new Subject<IOpinion[]>;

  constructor() { }

  ngOnInit(): void {
    this.opinions = [];
    this.opinionGetter.next(this.opinions);
  }

  addOpinion(opinion: IOpinion): void {
    this.opinions.push(opinion);
    this.opinionGetter.next(this.opinions);
  }

  getOpinion(): Observable<IOpinion[]> {
    return this.opinionGetter.asObservable();
  }

  returnOpinions(): IOpinion[] {
    return this.opinions;
  }
}
