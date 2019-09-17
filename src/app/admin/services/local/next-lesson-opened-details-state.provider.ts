import { Subject, Observable } from 'rxjs';
import { DetailsStateProvider, DetailsStateUpdateProvider } from 'src/app/booking/services/single-class-state.provider';
import { ScheduledClass, sameClassPredicate } from 'src/app/booking/domain/reservation';
import { InMemoryUpdatableDetailsStateProvider } from 'src/app/booking/services/local/in-memory-details-class-state.provider';
import { map, takeWhile } from 'rxjs/operators';

export class NextLessonOpenedDetailsClassStateProvider extends InMemoryUpdatableDetailsStateProvider<ScheduledClass> {
    constructor(classes$: Observable<ScheduledClass[]>) {
        super(sameClassPredicate, classes$.pipe(
            map((classes) => this.firstOnly(classes)),
            // TODO: if first manually closed => keep state ?
        ));
    }

    private firstOnly(classes: ScheduledClass[]): ScheduledClass[] {
        return classes && classes.length ? [classes[0]] : [];
    }
}
