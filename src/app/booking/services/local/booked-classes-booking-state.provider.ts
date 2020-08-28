import { BookingStateProvider } from 'src/app/booking/services/single-class-state.provider';
import { isUnknown, isBookedForRegisteredStudent } from './../../../account/domain/utils';
import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Observable } from 'rxjs';
import { bookingApprovedForStudent, bookingInWaitingListForStudent, hasPlaceAvailable } from './../../domain/reservation';
import { ClassState, sameClassPredicate, isCanceled } from '../../domain/reservation';
import { ScheduledClass } from '../../domain/reservation';
import { StudentId } from 'src/app/account/domain/student';
import { User } from 'src/app/account/domain/user';

export class BookedClassesBookingStateProvider implements BookingStateProvider {
    private currentUser: User | UnregisteredUser | null;

    constructor(private bookedClassesForCurrentUser: ScheduledClass[],
                currentUser$: Observable<User | UnregisteredUser | null>) {
        currentUser$.subscribe((u) => {
            console.log('[booked-classes-booking-state-provider] update current user', u);
            this.currentUser = u;
        });
    }

    isBookable(scheduledClass: ScheduledClass): boolean {
        return !isCanceled(scheduledClass);
    }

    isBooked(scheduledClass: ScheduledClass): boolean {
        return this.bookedClassesForCurrentUser.some(sameClassPredicate(scheduledClass));
    }

    isBookingApproved(scheduledClass: ScheduledClass): boolean {
        if (isUnknown(this.currentUser)) {
            return false;
        }
        if (!this.isBooked(scheduledClass)) {
            return false;
        }
        return bookingApprovedForStudent(scheduledClass, this.currentUser);
    }

    isBookingInWaitingList(scheduledClass: ScheduledClass): boolean {
        if (isUnknown(this.currentUser)) {
            return false;
        }
        if (!this.isBooked(scheduledClass)) {
            return false;
        }
        return bookingInWaitingListForStudent(scheduledClass, this.currentUser);
    }

    isConfirmable(scheduledClass: ScheduledClass): boolean {
        return this.isBookable(scheduledClass)
                && hasPlaceAvailable(scheduledClass)
                && bookingInWaitingListForStudent(scheduledClass, this.currentUser);
    }
}
