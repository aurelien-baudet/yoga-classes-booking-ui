import { PendingStateProvider, PendingStateUpdateProvider } from '../single-class-state.provider';
import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';

export class InMemoryUpdatablePendingStateProvider<T> implements PendingStateProvider<T>, PendingStateUpdateProvider<T> {
  constructor(private predicate: (pendingable: T) => (other: T) => boolean,
              private pendingBookings: T[] = []) { }

  isPending(pendingable: T): boolean {
    return this.pendingBookings.some(this.predicate(pendingable));
  }

  markPending(pendingable: T) {
    this.pendingBookings.push(pendingable);
  }

  unmarkPending(pendingable: T) {
    let idx;
    do {
      idx = this.pendingBookings.findIndex(this.predicate(pendingable));
      if (idx !== -1) {
        this.pendingBookings.splice(idx, 1);
      }
    } while (idx !== -1);
  }
}
