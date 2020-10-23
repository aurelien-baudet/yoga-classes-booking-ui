import { Subscription } from 'rxjs';import { Instant } from 'src/app/booking/domain/general';
import { StudentRef } from 'src/app/account/domain/student';

export interface PeriodCard {
  start: Instant;
  end: Instant;
}
export class PeriodCard implements PeriodCard {
  constructor(card: PeriodCard) {
    this.start = card.start;
    this.end = card.end;
  }

  static from(card: PeriodCard): PeriodCard | null {
    return card ? new PeriodCard(card) : null;
  }

  started(): boolean {
    return Date.now() >= this.start;
  }

  expired(): boolean {
    return Date.now() > this.end;
  }

  inProgress(): boolean {
    return this.started() && !this.expired();
  }

  inFuture(): boolean {
    return this.start > Date.now();
  }
}

export interface UserSubscriptions {
  id: string;
  subscriber: StudentRef;
  remainingClasses: number;
  monthCard: PeriodCard;
  annualCard: PeriodCard;
}
export class UserSubscriptions implements UserSubscriptions {
  constructor(subscription: UserSubscriptions) {
    this.id = subscription.id;
    this.subscriber = subscription.subscriber;
    this.remainingClasses = subscription.remainingClasses;
    this.monthCard = PeriodCard.from(subscription.monthCard);
    this.annualCard = PeriodCard.from(subscription.annualCard);
  }

  static from(subscription: UserSubscriptions): UserSubscriptions | null {
    return subscription ? new UserSubscriptions(subscription) : null;
  }
}
