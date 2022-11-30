import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() id: number;

  constructor(private app: AppComponent) {}

  choseTopic(): void {
    this.app.addInfo(this.id);
  }
}
