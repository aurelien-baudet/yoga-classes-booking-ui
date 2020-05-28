import { Place, BookingForFriend, Booking, UnbookingForFriend, SportLevel, PostureLevel } from './../../domain/reservation';
import { Instant } from './../../domain/general';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScheduledClass, CancelInfo } from '../../domain/reservation';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { UserInfo } from 'src/app/account/domain/user';

@Component({
  selector: 'app-scheduled-class-card',
  templateUrl: './scheduled-class-card.component.html',
  styleUrls: ['./scheduled-class-card.component.scss'],
})
export class ScheduledClassCardComponent {
  @Input()
  scheduledClass: ScheduledClass;
  @Input()
  booked: boolean;
  @Input()
  bookingApproved: boolean;
  @Input()
  bookingWaiting: boolean;
  @Input()
  pending: boolean;
  @Input()
  showDetails = false;
  @Input()
  bookable = true;
  @Input()
  editable = false;
  @Input()
  schedulable = false;
  @Input()
  cancelable = false;
  @Input()
  canceled = false;
  @Input()
  canceledInfo: CancelInfo;
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
  schedule = new EventEmitter<ScheduledClass>();
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


  getRemainingPlaces() {
    if (!this.scheduledClass) {
      return 0;
    }
    return Math.max(0, this.scheduledClass.lesson.maxStudents - this.scheduledClass.bookings.approved.length);
  }

  getNumberOfApprovedStudents() {
    if (!this.scheduledClass) {
      return 0;
    }
    return this.scheduledClass.bookings.approved.length;
  }

  getNumberOfWaitingStudents() {
    if (!this.scheduledClass) {
      return 0;
    }
    return this.scheduledClass.bookings.waiting.length;
  }

  getSportLevel() {
    const difficulty = this.scheduledClass.lesson.difficulty;
    if (!difficulty || difficulty.sportLevel === null) {
      return null;
    }
    return SportLevel.from(difficulty.sportLevel);
  }

  getPostureLevel() {
    const difficulty = this.scheduledClass.lesson.difficulty;
    if (!difficulty || difficulty.postureLevel === null) {
      return null;
    }
    return PostureLevel.from(difficulty.postureLevel);
  }
}
