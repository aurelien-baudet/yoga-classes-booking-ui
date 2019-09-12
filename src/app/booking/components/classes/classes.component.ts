import { ClassState, Place, BookingForFriend, UnbookingForFriend } from './../../domain/reservation';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScheduledClass, sameClassPredicate } from '../../domain/reservation';
import { BookingStateProvider, ManageClassStateProvider, DetailsStateProvider, DetailsStateUpdateProvider, PendingStateProvider, PendingStateUpdateProvider } from '../../services/single-class-state.provider';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { UserInfo } from 'src/app/account/domain/user';

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
  @Input()
  searchFriendProvider: AutoCompleteService;

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
  @Output()
  showPlaceDetails = new EventEmitter<Place>();
  @Output()
  showApprovedStudents = new EventEmitter<ScheduledClass>();
  @Output()
  showWaitingStudents = new EventEmitter<ScheduledClass>();
  @Output()
  showClassDetails = new EventEmitter<ScheduledClass>();
  @Output()
  bookForFriend = new EventEmitter<BookingForFriend>();
  @Output()
  unbookForFriend = new EventEmitter<UnbookingForFriend>();
}
