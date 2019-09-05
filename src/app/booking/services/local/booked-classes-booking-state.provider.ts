import { ClassState, sameClassPredicate } from '../../domain/reservation';
import { ScheduledClass } from '../../domain/reservation';

export class BookedClassesBookingStateProvider {
    constructor(private bookedClassesForCurrentUser: ScheduledClass[]) {}

    isBookable(scheduledClass: ScheduledClass): boolean {
        return scheduledClass.state !== ClassState.CANCELED;
    }

    isBooked(scheduledClass: ScheduledClass): boolean {
        return this.bookedClassesForCurrentUser.some(sameClassPredicate(scheduledClass));
    }
}
