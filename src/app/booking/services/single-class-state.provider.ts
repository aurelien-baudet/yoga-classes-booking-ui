import { ScheduledClass, CancelInfo } from '../domain/reservation';

export abstract class BookingStateProvider {
    abstract isBookable(scheduledClass: ScheduledClass): boolean;
    abstract isBooked(scheduledClass: ScheduledClass): boolean;
    abstract isBookingApproved(scheduledClass: ScheduledClass): boolean;
    abstract isBookingInWaitingList(scheduledClass: ScheduledClass): boolean;
    abstract isConfirmable(scheduledClass: ScheduledClass): boolean;
}

export abstract class ManageClassStateProvider {
    abstract isEditable(scheduledClass: ScheduledClass): boolean;
    abstract isSchedulable(scheduledClass: ScheduledClass): boolean;
    abstract isCancelable(scheduledClass: ScheduledClass): boolean;
    abstract isCanceled(scheduledClass: ScheduledClass): boolean;
    abstract getCanceledInfo(scheduledClass: ScheduledClass): CancelInfo;
    abstract isMessageable(scheduledClass: ScheduledClass): boolean;
}

export abstract class DetailsStateProvider<T> {
    abstract isShowDetails(detaillable: T): boolean;
}
export abstract class DetailsStateUpdateProvider<T> {
    abstract viewDetails(detaillable: T);
    abstract hideDetails(detaillable: T);
}

export abstract class PendingStateProvider<T> {
    abstract isPending(pendingable: T): boolean;
}
export abstract class PendingStateUpdateProvider<T> {
    abstract markPending(pendingable: T);
    abstract unmarkPending(pendingable: T);
}
