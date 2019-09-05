import { ClassState } from './../../../booking/domain/reservation';
import { ScheduledClass } from 'src/app/booking/domain/reservation';
import { ManageClassStateProvider } from 'src/app/booking/services/single-class-state.provider';

export class ManageableProvider implements ManageClassStateProvider {
    isEditable(scheduledClass: ScheduledClass): boolean {
        return scheduledClass.state !== ClassState.CANCELED;
    }

    isCancelable(scheduledClass: ScheduledClass): boolean {
        return scheduledClass.state !== ClassState.CANCELED;
    }

    isCanceled(scheduledClass: ScheduledClass): boolean {
        return scheduledClass.state === ClassState.CANCELED;
    }
}
