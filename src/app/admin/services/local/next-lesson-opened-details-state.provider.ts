import { DetailsStateProvider, DetailsStateUpdateProvider } from 'src/app/booking/services/single-class-state.provider';
import { ScheduledClass, sameClassPredicate } from 'src/app/booking/domain/reservation';
import { InMemoryUpdatableDetailsStateProvider } from 'src/app/booking/services/local/in-memory-details-class-state.provider';

export class NextLessonOpenedDetailsClassStateProvider extends InMemoryUpdatableDetailsStateProvider<ScheduledClass> {
    constructor(classes: ScheduledClass[]) {
        super(sameClassPredicate, classes.length === 0 ? [] : [classes[0]]);
    }
}
