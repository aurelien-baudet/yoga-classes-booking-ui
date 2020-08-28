import { StudentListUnbookableStateProvider } from 'src/app/booking/services/student-list-unbookable-state.provider';
import { Booking, BookingForFriend, UnbookingForFriend } from '../../domain/reservation';
import { Lesson, ScheduledClass } from '../../domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { UserInfo } from 'src/app/account/domain/user';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent {
  @Input()
  scheduledClass: ScheduledClass;
  @Input()
  searchFriendProvider: AutoCompleteService;
  @Input()
  unbookableProvider: StudentListUnbookableStateProvider;

  @Output()
  unbookForFriend = new EventEmitter<UnbookingForFriend>();
  @Output()
  bookForFriend = new EventEmitter<BookingForFriend>();
}
