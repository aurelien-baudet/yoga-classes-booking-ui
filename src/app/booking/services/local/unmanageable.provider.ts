import { ClassState } from './../../domain/reservation';
import { ManageClassStateProvider } from '../single-class-state.provider';
import { ScheduledClass } from '../../domain/reservation';

export class UnmanageableProvider implements ManageClassStateProvider {
    isEditable(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isCancelable(scheduledClass: ScheduledClass): boolean {
        return false;
    }

    isCanceled(scheduledClass: ScheduledClass): boolean {
        return scheduledClass.state === ClassState.CANCELED;
    }
}
