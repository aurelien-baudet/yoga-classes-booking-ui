import { ClassState } from '../../domain/reservation';
import { SingleClassStateProvider } from '../single-class-state.provider';
import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';

export class StudentSingleClassStateProvider implements SingleClassStateProvider {
    constructor(private bookedClassesForCurrentUser: ScheduledClass[],
                private pendingBookings: ScheduledClass[],
                private opened: ScheduledClass[]) {}

    isShowDetails(scheduledClass: ScheduledClass): boolean {
        return this.opened.some(sameClassPredicate(scheduledClass));
    }

    isBookable(scheduledClass: ScheduledClass): boolean {
        return scheduledClass.state !== ClassState.CANCELED;
    }

    isBooked(scheduledClass: ScheduledClass): boolean {
        return this.bookedClassesForCurrentUser.some(sameClassPredicate(scheduledClass));
    }

    isPending(scheduledClass: ScheduledClass): boolean {
        return this.pendingBookings.some(sameClassPredicate(scheduledClass));
    }
}
