import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';
import { DetailsStateProvider, DetailsStateUpdateProvider } from '../single-class-state.provider';
import { Observable } from 'rxjs';

export class InMemoryUpdatableDetailsStateProvider<T> implements DetailsStateProvider<T>, DetailsStateUpdateProvider<T> {
  private opened: T[] = [];

  constructor(private predicate: (detaillable: T) => (other: T) => boolean,
              private opened$: Observable<T[]> = null,
              private merge = true) {
    if (this.opened$) {
      this.opened$.subscribe((opened) => this.updateOpened(opened));
    }
  }

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

  private updateOpened(newOpened: T[]) {
    if (this.merge) {
      this.opened.push(...newOpened);
    } else {
      this.opened = newOpened;
    }
  }
}
