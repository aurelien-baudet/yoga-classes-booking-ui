import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Booking } from '../../domain/reservation';

@Component({
  selector: 'app-approved-students',
  templateUrl: './approved-students.component.html',
  styleUrls: ['./approved-students.component.scss'],
})
export class ApprovedStudentsComponent {
  @Input()
  approvedBookings: Booking[];
  @Input()
  maxStudents: number;

  @Output()
  unbook = new EventEmitter<Booking>();
}
