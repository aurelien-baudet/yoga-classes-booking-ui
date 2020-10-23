import { Page } from './../../common/util/pageable.util';
import { UserSubscriptions, PeriodCard } from 'src/app/account/domain/subscription';
import { User } from 'src/app/account/domain/user';
import { StudentRef } from '../domain/student';

export interface SubscriptionsUpdate {
  remainingClasses: number;
  monthCard: PeriodCard;
  annualCard: PeriodCard;
}

export abstract class SubscriptionService {
  async abstract getCurrentSubscriptionsFor(student: User): Promise<UserSubscriptions>;

  async abstract getCurrentSubscriptions(): Promise<Page<UserSubscriptions>>;

  async abstract updateSubscriptionsForStudent(student: User | StudentRef, subscription: SubscriptionsUpdate): Promise<UserSubscriptions>;
}