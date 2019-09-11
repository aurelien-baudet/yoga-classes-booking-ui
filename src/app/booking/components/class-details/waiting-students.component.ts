import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../domain/reservation';

@Component({
  selector: 'app-waiting-students',
  templateUrl: './waiting-students.component.html',
  styleUrls: ['./waiting-students.component.scss'],
})
export class WaitingStudentsComponent {
  @Input()
  waitingBookings: Booking[];

  @Output()
  unbook = new EventEmitter<Booking>();
}
