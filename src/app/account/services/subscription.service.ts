import { Page, PageRequest } from './../../common/util/pageable.util';
import { UserSubscriptions, PeriodCard } from 'src/app/account/domain/subscription';
import { User } from 'src/app/account/domain/user';
import { StudentRef } from '../domain/student';

export interface SubscriptionsUpdate {
  remainingClasses: number;
  monthCard: PeriodCard;
  annualCard: PeriodCard;
}

export abstract class SubscriptionService {
  async abstract getCurrentSubscriptionsFor(student: User | StudentRef): Promise<UserSubscriptions>;

  async abstract getCurrentSubscriptions(page: PageRequest): Promise<Page<UserSubscriptions>>;

  async abstract updateSubscriptionsForStudent(student: User | StudentRef, subscription: SubscriptionsUpdate): Promise<UserSubscriptions>;
}
