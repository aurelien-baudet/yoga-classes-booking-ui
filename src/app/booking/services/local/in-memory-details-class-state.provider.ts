import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';
import { DetailsStateProvider, DetailsStateUpdateProvider } from '../single-class-state.provider';

export class InMemoryUpdatableDetailsStateProvider<T> implements DetailsStateProvider<T>, DetailsStateUpdateProvider<T> {
  constructor(private predicate: (detaillable: T) => (other: T) => boolean,
              private opened: T[] = []) {}

  isShowDetails(detaillable: T): boolean {
    return this.opened.some(this.predicate(detaillable));
  }

  viewDetails(detaillable: T) {
    this.opened.push(detaillable);
  }

  hideDetails(detaillable: T) {
    let idx;
    do {
      idx = this.opened.findIndex(this.predicate(detaillable));
      if (idx !== -1) {
        this.opened.splice(idx, 1);
      }
    } while (idx !== -1);
  }
}
