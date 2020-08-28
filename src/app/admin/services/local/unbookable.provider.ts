import { BookingStateProvider } from 'src/app/booking/services/single-class-state.provider';
import { ScheduledClass } from 'src/app/booking/domain/reservation';

export class UnbookableProvider implements BookingStateProvider {
    isBookable(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isBooked(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isBookingApproved(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isBookingInWaitingList(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isConfirmable(scheduledClass: ScheduledClass): boolean {
        return false;
    }
}
