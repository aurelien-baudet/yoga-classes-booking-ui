import { isBookedForStudent } from './../../../account/domain/utils';
import { Observable } from 'rxjs';
import { User } from './../../../account/domain/user';
import { Booking } from './../../domain/reservation';
import { StudentListUnbookableStateProvider } from "../student-list-unbookable-state.provider";
import { UnregisteredUser } from '../../../account/domain/unregistered';

export class CanUnbookOwnBookingUnbookableProvider implements StudentListUnbookableStateProvider {
  private currentUser: User | UnregisteredUser | null;

  constructor(currentUser$: Observable<User | UnregisteredUser | null>) {
    currentUser$.subscribe((u) => {
      console.log('[can-unbook-own-booking-provider] update current user', u);
      this.currentUser = u;
    });
  }

  isUnbookable(booking: Booking): boolean {
    return isBookedForStudent(booking, this.currentUser);
  }
}
