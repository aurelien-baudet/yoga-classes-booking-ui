import { Instant } from './../../domain/general';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ScheduledClass } from '../../domain/reservation';

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
  pending: boolean;
  @Input()
  showDetails = false;
  @Input()
  bookable = true;

  @Output()
  book = new EventEmitter<ScheduledClass>();
  @Output()
  cancel = new EventEmitter<ScheduledClass>();
  @Output()
  viewDetails = new EventEmitter<ScheduledClass>();
  @Output()
  hideDetails = new EventEmitter<ScheduledClass>();

  showOrHideDetails() {
    if (this.showDetails) {
      this.hideDetails.emit(this.scheduledClass);
    } else {
      this.viewDetails.emit(this.scheduledClass);
    }
  }

  bookOrCancel() {
    if (!this.bookable) {
      return;
    }
    if (this.booked) {
      this.cancel.emit(this.scheduledClass);
    } else {
      this.book.emit(this.scheduledClass);
    }
  }

  getBookingState() {
    if (this.pending) {
      return 'booking';
    }
    if (this.booked) {
      return 'booked';
    }
    return 'not-booked';
  }

  getRemainingPlaces() {
    if (!this.scheduledClass) {
      return 0;
    }
    return Math.max(0, this.scheduledClass.lesson.maxStudents - this.scheduledClass.bookings.approved.length);
  }

  getNumberOfWaitingStudents() {
    if (!this.scheduledClass) {
      return 0;
    }
    return this.scheduledClass.bookings.waiting.length;
  }

}
