import { ClassState, CancelInfo, isCanceled } from './../../domain/reservation';
import { ManageClassStateProvider } from '../single-class-state.provider';
import { ScheduledClass } from '../../domain/reservation';

export class UnmanageableProvider implements ManageClassStateProvider {
    isEditable(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isSchedulable(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isCancelable(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isCanceled(scheduledClass: ScheduledClass): boolean {
        return isCanceled(scheduledClass);
    }

    getCanceledInfo(scheduledClass: ScheduledClass): CancelInfo {
        return isCanceled(scheduledClass) ? {message: scheduledClass.state.message} : null;
    }

    isMessageable(scheduledClass: ScheduledClass): boolean {
        return false;
    }
}
