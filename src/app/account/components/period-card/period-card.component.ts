import { PeriodCard } from 'src/app/account/domain/subscription';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-period-card',
  templateUrl: './period-card.component.html',
  styleUrls: ['./period-card.component.scss'],
})
export class PeriodCardComponent {
  @Input()
  type: string;
  @Input()
  card: PeriodCard;

  getProgress(): number {
    const totalDuration = this.card.end - this.card.start;
    return (Date.now() - this.card.start) / totalDuration;
  }
}
