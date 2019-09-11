import { ClassState, sameClassPredicate, isCanceled } from '../../domain/reservation';
import { ScheduledClass } from '../../domain/reservation';

export class BookedClassesBookingStateProvider {
    constructor(private bookedClassesForCurrentUser: ScheduledClass[]) {}

    isBookable(scheduledClass: ScheduledClass): boolean {
        return !isCanceled(scheduledClass);
    }

    isBooked(scheduledClass: ScheduledClass): boolean {
        return this.bookedClassesForCurrentUser.some(sameClassPredicate(scheduledClass));
    }
}
