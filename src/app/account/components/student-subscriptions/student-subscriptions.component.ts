import { UserSubscriptions } from './../../domain/subscription';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-subscriptions',
  templateUrl: './student-subscriptions.component.html',
  styleUrls: ['./student-subscriptions.component.scss'],
})
export class StudentSubscriptionsComponent {
  @Input()
  subscription?: UserSubscriptions;

  getRemainingClasses() {
    return Math.max(this.subscription.remainingClasses, 0);
  }

  areAllCardsExpired() {
    if (this.hasValidAnnualCard()) {
      return false;
    }
    if (this.hasValidMonthCard()) {
      return false;
    }
    return this.subscription.remainingClasses < 0;
  }

  hasValidAnnualCard() {
    if (!this.subscription.annualCard) {
      return false;
    }
    return this.subscription.annualCard.inProgress();
  }

  hasValidMonthCard() {
    if (!this.subscription.monthCard) {
      return false;
    }
    return this.subscription.monthCard.inProgress();
  }
}
