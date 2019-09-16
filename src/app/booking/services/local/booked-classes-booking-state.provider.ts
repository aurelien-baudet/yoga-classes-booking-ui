import { UnregisteredUser } from 'src/app/account/domain/unregistered';
import { Observable } from 'rxjs';
import { bookingApprovedForStudent, bookingInWaitingListForStudent } from './../../domain/reservation';
import { ClassState, sameClassPredicate, isCanceled } from '../../domain/reservation';
import { ScheduledClass } from '../../domain/reservation';
import { StudentId } from 'src/app/account/domain/student';
import { isUnknown, User } from 'src/app/account/domain/user';

export class BookedClassesBookingStateProvider {
    private currentUser: User | UnregisteredUser | null;

    constructor(private bookedClassesForCurrentUser: ScheduledClass[],
                currentUser$: Observable<User | UnregisteredUser | null>) {
        currentUser$.subscribe((u) => this.currentUser = u);
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
        return bookingApprovedForStudent(scheduledClass, this.currentUser as StudentId);
    }

    isBookingInWaitingList(scheduledClass: ScheduledClass): boolean {
        if (isUnknown(this.currentUser)) {
            return false;
        }
        if (!this.isBooked(scheduledClass)) {
            return false;
        }
        return bookingInWaitingListForStudent(scheduledClass, this.currentUser as StudentId);
    }
}
