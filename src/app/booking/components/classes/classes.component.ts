import { ClassState } from './../../domain/reservation';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';
import { BookingStateProvider, ManageClassStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, PendingStateProvider, PendingStateUpdateProvider } from '../../services/single-class-state.provider';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  @Input()
  classes: ScheduledClass[];
  @Input()
  bookingStateProvider: BookingStateProvider;
  @Input()
  detailsStateProvider: DetailsStateProvider<ScheduledClass>;
  @Input()
  pendingStateProvider: PendingStateProvider<ScheduledClass>;
  @Input()
  manageClassStateProvider: ManageClassStateProvider;

  @Output()
  book = new EventEmitter<ScheduledClass>();
  @Output()
  unbook = new EventEmitter<ScheduledClass>();
  @Output()
  viewDetails = new EventEmitter<ScheduledClass>();
  @Output()
  hideDetails = new EventEmitter<ScheduledClass>();
  @Output()
  edit = new EventEmitter<ScheduledClass>();
  @Output()
  cancel = new EventEmitter<ScheduledClass>();
}
