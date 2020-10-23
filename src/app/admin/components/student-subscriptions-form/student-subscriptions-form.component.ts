import { DateUtil } from './../../../common/util/date.util';
import { Instant } from 'src/app/booking/domain/general';
import { UserSubscriptions, PeriodCard } from './../../../account/domain/subscription';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


interface SubscriptionModel {
  remainingClasses: number;
  monthStart: string | null;
  monthEnd: string | null;
  annualStart: string | null;
  annualEnd: string | null;
}


const defaultModel = (): SubscriptionModel => ({
  remainingClasses: 0,
  monthStart: null,
  monthEnd: null,
  annualStart: null,
  annualEnd: null,
});

const DAYS_MS = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-student-subscriptions-form',
  templateUrl: './student-subscriptions-form.component.html',
  styleUrls: ['./student-subscriptions-form.component.scss'],
})
export class StudentSubscriptionsFormComponent {
  @Input()
  set subscription(subscription: UserSubscriptions) {
    if (subscription) {
      this._subscription = subscription;
      this.subscriptionModel = {
        remainingClasses: subscription.remainingClasses,
        monthStart: subscription.monthCard && this.dateUtil.toISODateString(subscription.monthCard.start) || null,
        monthEnd: subscription.monthCard && this.dateUtil.toISODateString(subscription.monthCard.end) || null,
        annualStart: subscription.annualCard && this.dateUtil.toISODateString(subscription.annualCard.start) || null,
        annualEnd: subscription.annualCard && this.dateUtil.toISODateString(subscription.annualCard.end) || null,
      };
    } else {
      this._subscription = null;
      this.subscriptionModel = defaultModel();
    }
  }
  @Input()
  loading = false;

  @Output()
  update = new EventEmitter<UserSubscriptions>();

  subscriptionModel: SubscriptionModel;
  private _subscription: UserSubscriptions;

  constructor(private dateUtil: DateUtil) {}

  save(model: SubscriptionModel) {
    if (!this._subscription) {
      this.update.emit(UserSubscriptions.from(null));
      return;
    }
    this.update.emit(UserSubscriptions.from({
      id: this._subscription.id || null,
      subscriber: this._subscription.subscriber,
      remainingClasses: model.remainingClasses,
      monthCard: this.toPeriodCard(model.monthStart, model.monthEnd),
      annualCard: this.toPeriodCard(model.annualStart, model.annualEnd)
    }));
  }

  autofillMonthEnd() {
    if (this.subscriptionModel.monthStart && !this.subscriptionModel.monthEnd) {
      this.subscriptionModel.monthEnd = this.addDays(this.subscriptionModel.monthStart, 30);
    }
  }

  autofillAnnualEnd() {
    if (this.subscriptionModel.annualStart && !this.subscriptionModel.annualEnd) {
      this.subscriptionModel.annualEnd = this.addDays(this.subscriptionModel.annualStart, 365);
    }
  }

  isClassPackageCardExpired() {
    if (!this._subscription) {
      return false;
    }
    return this._subscription && this._subscription.remainingClasses < 0;
  }

  isMonthCardExpired() {
    if (!this._subscription || !this._subscription.monthCard) {
      return false;
    }
    return this._subscription.monthCard.expired();
  }

  isAnnualCardExpired() {
    if (!this._subscription || !this._subscription.annualCard) {
      return false;
    }
    return this._subscription.annualCard.expired();
  }

  private addDays(dateStr: string, days: number): string {
    return this.dateUtil.toISODateString(this.dateUtil.fromISODateString(dateStr).valueOf() + days * DAYS_MS);
  }

  private toPeriodCard(start: string, end: string): PeriodCard {
    if (!start || !end) {
      return null;
    }
    return {
      start: this.dateUtil.fromISODateString(start).valueOf(),
      end: this.dateUtil.fromISODateString(end).valueOf()
    } as PeriodCard;
  }
}
