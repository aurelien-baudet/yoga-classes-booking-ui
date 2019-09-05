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
  @Input()
  editable = false;
  @Input()
  cancelable = false;
  @Input()
  canceled = false;

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
