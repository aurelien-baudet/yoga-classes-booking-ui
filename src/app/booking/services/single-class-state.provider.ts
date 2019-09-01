import { ScheduledClass } from '../domain/reservation';

export abstract class SingleClassStateProvider {
    abstract isShowDetails(scheduledClass: ScheduledClass): boolean;
    abstract isBookable(scheduledClass: ScheduledClass): boolean;
    abstract isBooked(scheduledClass: ScheduledClass): boolean;
    abstract isPending(scheduledClass: ScheduledClass): boolean;
}
