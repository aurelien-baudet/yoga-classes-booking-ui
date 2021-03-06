import { ClassState, CancelInfo, isCanceled } from './../../../booking/domain/reservation';
import { ScheduledClass } from 'src/app/booking/domain/reservation';
import { ManageClassStateProvider } from 'src/app/booking/services/single-class-state.provider';

export class ManageableProvider implements ManageClassStateProvider {
    isEditable(scheduledClass: ScheduledClass): boolean {
        return !isCanceled(scheduledClass);
    }

    isSchedulable(scheduledClass: ScheduledClass): boolean {
        return !isCanceled(scheduledClass);
    }

    isCancelable(scheduledClass: ScheduledClass): boolean {
        return !isCanceled(scheduledClass);
    }

    isCanceled(scheduledClass: ScheduledClass): boolean {
        return isCanceled(scheduledClass);
    }

    getCanceledInfo(scheduledClass: ScheduledClass): CancelInfo {
        return isCanceled(scheduledClass) ? {message: scheduledClass.state.message} : null;
    }

    isMessageable(scheduledClass: ScheduledClass): boolean {
        return !isCanceled(scheduledClass);
    }

    isRemovable(scheduledClass: ScheduledClass): boolean {
        return isCanceled(scheduledClass) && scheduledClass.bookings.all.length == 0;
    }
}
