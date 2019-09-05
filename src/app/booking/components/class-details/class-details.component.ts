import { Booking } from '../../domain/reservation';
import { Lesson, ScheduledClass } from '../../domain/reservation';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent {
  @Input()
  scheduledClass: ScheduledClass;

  @Output()
  unbook = new EventEmitter<Booking>();

}
